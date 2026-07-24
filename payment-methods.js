
/*
PAYMENT_METHODS — powers the scrolling payment ticker in index.html.
This file was referenced by <script src="bank-logos-1.js">,
<script src="bank-logos-2.js"> and <script src="payment-methods.js">
in the original index.html, but none of those files were ever
supplied — so the ticker silently rendered empty. This single file
replaces all three with emoji-based icons (no external logo images
needed), matching the fallback path main.js already supports.

If you later want real bank/wallet logos, define a BANK_LOGOS object
here (key -> image URL) and set the matching `logo` key below; the
ticker will prefer it automatically.
*/
var PAYMENT_METHODS = [
{ name: 'M-Pesa', emoji: '📲', url: 'https://www.safaricom.co.ke/personal/m-pesa' },
{ name: 'Visa', emoji: '💳', url: 'https://www.visa.com' },
{ name: 'Mastercard', emoji: '💳', url: 'https://www.mastercard.com' },
{ name: 'KCB Bank', emoji: '🏦', url: 'https://ke.kcbgroup.com' },
{ name: 'Equity Bank', emoji: '🏦', url: 'https://equitygroupholdings.com' },
{ name: 'Airtel Money', emoji: '📱', url: 'https://www.airtelkenya.com' },
];
