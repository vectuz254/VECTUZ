// ═══════════════════════════════════════════
// VECTUZ — daraja-checkout Edge Function
// Deploy with: supabase functions deploy daraja-checkout
// Set secrets with: supabase secrets set KEY=value
// ═══════════════════════════════════════════
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const CONSUMER_KEY = Deno.env.get('DARAJA_CONSUMER_KEY')!
const CONSUMER_SECRET = Deno.env.get('DARAJA_CONSUMER_SECRET')!
const SHORTCODE = Deno.env.get('DARAJA_SHORTCODE')!       // your Till Number (Buy Goods)
const PASSKEY = Deno.env.get('DARAJA_PASSKEY')!
const CALLBACK_URL = Deno.env.get('DARAJA_CALLBACK_URL')! // e.g. https://YOUR-PROJECT-REF.supabase.co/functions/v1/daraja-callback
// 'CustomerBuyGoodsOnline' for a Till Number, 'CustomerPayBillOnline' for a Paybill
const TRANSACTION_TYPE = Deno.env.get('DARAJA_TXN_TYPE') || 'CustomerBuyGoodsOnline'
// sandbox for testing, api for a Go-Live'd production app
const DARAJA_BASE_URL = Deno.env.get('DARAJA_ENV') === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

function timestamp() {
  const d = new Date()
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}${pad(d.getHours())}${pad(d.getMinutes())}${pad(d.getSeconds())}`
}

async function getAccessToken() {
  const auth = btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)
  const res = await fetch(`${DARAJA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` }
  })
  if (!res.ok) throw new Error('Failed to get Daraja access token')
  const data = await res.json()
  return data.access_token as string
}

Deno.serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 })

  try {
    const { order_id, phone, amount } = await req.json()
    if (!order_id || !phone || !amount) {
      return new Response(JSON.stringify({ error: 'order_id, phone and amount are required' }), { status: 400 })
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

    const ts = timestamp()
    const password = btoa(`${SHORTCODE}${PASSKEY}${ts}`)
    const token = await getAccessToken()

    const stkRes = await fetch(`${DARAJA_BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: ts,
        TransactionType: TRANSACTION_TYPE,
        Amount: Math.round(amount),
        PartyA: phone,
        PartyB: SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: CALLBACK_URL,
        AccountReference: `VECTUZ-${order_id}`,
        TransactionDesc: 'VECTUZ website payment',
      }),
    })

    const stkData = await stkRes.json()

    if (!stkRes.ok || stkData.ResponseCode !== '0') {
      await supabaseAdmin.from('orders').update({ status: 'failed' }).eq('id', order_id)
      return new Response(JSON.stringify({ error: stkData.errorMessage || 'STK push was rejected' }), { status: 502 })
    }

    // Save the CheckoutRequestID so the callback can match it back to this order
    await supabaseAdmin
      .from('orders')
      .update({ checkout_request_id: stkData.CheckoutRequestID })
      .eq('id', order_id)

    return new Response(JSON.stringify({ ok: true, checkout_request_id: stkData.CheckoutRequestID }), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Unexpected error' }), { status: 500 })
  }
})
