// ============================================================================
// payments.js
// Two payment paths for a signed-in client:
//
// 1. CARD — via Paystack Inline. Card numbers never touch your server;
//    Paystack's own popup collects them. You only need a PUBLIC key here,
//    which is safe to put in front-end code (that's what it's for).
//
// 2. M-PESA — via Safaricom's Daraja STK push. This CANNOT be called
//    directly from the browser: it needs your Daraja consumer key/secret,
//    which must never be visible in page source. So this file calls YOUR
//    Supabase Edge Function instead, which holds those secrets server-side
//    and talks to Daraja on the client's behalf. See
//    supabase-daraja-function.js for that function's code — deploy it from
//    the Supabase Dashboard's Edge Functions editor (works from a phone,
//    no CLI needed).
//
// SETUP:
// 1. Paystack: https://dashboard.paystack.com → Settings → API Keys →
//    copy the "Public Key" (starts with pk_) → paste below.
//    (Paystack settles to any Kenyan bank account you add under
//    Settings → Preferences → Settlement Account — works with any bank.)
// 2. Supabase: paste your project's Edge Function URL below.
// ============================================================================

const PAYSTACK_PUBLIC_KEY = "pk_REPLACE_ME"; // safe to expose — it's a public key
const SUPABASE_DARAJA_FUNCTION_URL = "https://YOUR-PROJECT-REF.functions.supabase.co/daraja-stk";

// ---------------------------------------------------------------------------
// Card checkout (Paystack Inline popup)
// ---------------------------------------------------------------------------
function payWithCard({ amountKes, email, onSuccess, onClose }) {
  if (typeof PaystackPop === "undefined") {
    alert("Payment script hasn't loaded yet — check your internet connection and try again.");
    return;
  }
  var handler = PaystackPop.setup({
    key: PAYSTACK_PUBLIC_KEY,
    email: email,
    amount: Math.round(amountKes * 100), // Paystack expects kobo/cents-equivalent
    currency: "KES",
    ref: "VECTUZ-" + Date.now(),
    callback: function (response) {
      // response.reference — verify this server-side (Supabase Edge Function
      // + Paystack secret key) before marking the invoice paid in Firestore.
      // Doing verification client-side only is easy to spoof.
      if (onSuccess) onSuccess(response);
    },
    onClose: function () {
      if (onClose) onClose();
    }
  });
  handler.openIframe();
}

// ---------------------------------------------------------------------------
// M-Pesa STK push (via your Supabase Edge Function proxy)
// ---------------------------------------------------------------------------
async function payWithMpesa({ amountKes, phone, accountRef, onSuccess, onError }) {
  try {
    var res = await fetch(SUPABASE_DARAJA_FUNCTION_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(amountKes),
        phone: phone, // format 2547XXXXXXXX
        accountRef: accountRef || "VECTUZ"
      })
    });
    var data = await res.json();
    if (!res.ok) throw new Error(data.error || "STK push failed");
    if (onSuccess) onSuccess(data);
  } catch (err) {
    if (onError) onError(err);
  }
}

window.VectuzPayments = { payWithCard: payWithCard, payWithMpesa: payWithMpesa };
