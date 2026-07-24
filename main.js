/*
═══════════════════════════════════════════
VECTUZ — main.js
Fixed/updated:
 - Premium & MAX package modals now use the SAME CSS Rubik's-cube
   animation as Starter/Business (the old three.js "energy cube" path
   has been removed — one consistent animation everywhere).
 - Hero device now shows a live, always-on CSS "someone scrolling the
   site" preview. If you drop a real screen-capture video in as
   assets/hero-demo.mp4, it will automatically take over once it
   loads; otherwise the animated preview keeps playing forever, so
   the hero never looks broken or empty.
 - Pricing copy (page counts, delivery-time claims) now matches the
   package modal, the pricing cards, and the Terms & Conditions —
   previously these disagreed with each other.
═══════════════════════════════════════════
*/

/* ── THEME GUARD ── */
(function () {
var saved = localStorage.getItem('theme') || 'dark';
if (saved === 'light') {
document.documentElement.setAttribute('data-theme', 'light');
} else {
document.documentElement.removeAttribute('data-theme');
}
})();

/* ── CUBE COLOURS ── */
var SCRAMBLED = {
front: ['#e84444','#f5c842','#3a8fe8','#00c853','#f0ece4','#e87a00','#3a8fe8','#e84444','#f5c842'],
back:
['#f5c842','#e84444','#f0ece4','#e87a00','#3a8fe8','#00c853','#e87a00','#f5c842','#e84444'],
right:
['#3a8fe8','#00c853','#e84444','#f5c842','#e87a00','#e84444','#f0ece4','#3a8fe8','#00c853'],
left: ['#00c853','#e87a00','#f5c842','#3a8fe8','#e84444','#f5c842','#e87a00','#f0ece4','#3a8fe8'],
top: ['#f5c842','#3a8fe8','#e87a00','#e84444','#f0ece4','#3a8fe8','#00c853','#e84444','#f5c842'],
bottom:
['#f0ece4','#00c853','#3a8fe8','#f5c842','#e84444','#e87a00','#3a8fe8','#f0ece4','#00c853'],
};
var SOLVED = {
front: Array(9).fill('#e84444'),
back: Array(9).fill('#e87a00'),
right: Array(9).fill('#3a8fe8'),
left: Array(9).fill('#00c853'),
top: Array(9).fill('#f5c842'),
bottom: Array(9).fill('#f0ece4'),
};

/* ── BUILD CUBE (CSS Rubik's-style cube — used for every package tier) ── */
function buildCube(container, startSolved) {
container.innerHTML = '';
var faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
var colours = startSolved ? SOLVED : SCRAMBLED;
faces.forEach(function (faceName) {
var face = document.createElement('div');
face.className = 'cube-face ' + faceName;
face.dataset.face = faceName;
for (var i = 0; i < 9; i++) {
var cubie = document.createElement('div');
cubie.className = 'cubie';
cubie.style.background = colours[faceName][i];
face.appendChild(cubie);
}
container.appendChild(face);
});
}

/* ── ANIMATE: scrambled → solved ── */
function animateSolve(cube, onDone) {
var faces = cube.querySelectorAll('.cube-face');
faces.forEach(function (face, fi) {
var faceName = face.dataset.face;
face.querySelectorAll('.cubie').forEach(function (cubie, ci) {
setTimeout(function () {
cubie.style.background = SOLVED[faceName][ci];
cubie.style.transform = 'scale(1.1)';
setTimeout(function () { cubie.style.transform = 'scale(1)'; }, 150);
}, fi * 200 + ci * 60);
});
});
var total = 6 * 200 + 9 * 60 + 600;
if (onDone) setTimeout(onDone, total);
}

/* ── ANIMATE: solved → scrambled ── */
function animateUnsolve(cube, onDone) {
var faces = cube.querySelectorAll('.cube-face');
faces.forEach(function (face, fi) {
var faceName = face.dataset.face;
face.querySelectorAll('.cubie').forEach(function (cubie, ci) {
setTimeout(function () {
cubie.style.background = SCRAMBLED[faceName][ci];
cubie.style.transform = 'scale(1.1)';
setTimeout(function () { cubie.style.transform = 'scale(1)'; }, 150);
}, fi * 200 + ci * 60);
});
});
var total = 6 * 200 + 9 * 60 + 600;
if (onDone) setTimeout(onDone, total);
}

/* ── SCATTER ── */
function scatterCube(cube) {
var cubies = cube.querySelectorAll('.cubie');
cubies.forEach(function (c) {
var rx = (Math.random() - 0.5) * 200;
var ry = (Math.random() - 0.5) * 200;
var rz = (Math.random() - 0.5) * 200;
var rot = Math.random() * 720;
c.style.transition = 'transform 1.2s cubic-bezier(.25,1,.3,1), opacity 1.2s cubic-bezier(.25,1,.3,1)';
c.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,' + rz + 'px) rotate(' + rot + 'deg)';
c.style.opacity = '0.3';
});
}

/* ── PORTFOLIO SLIDES — images matched to category ── */
var PORTFOLIO_SLIDES = [
{ label: 'Restaurant Site', icon: '🍽', img: 'assets/sample-restaurant.jpg', alt: 'Restaurant dish presentation' },
{ label: 'E-Commerce Store', icon: '🛍', img: 'assets/sample-tech.jpg', alt: 'E-commerce shopping concept' },
{ label: 'Salon Booking', icon: '💇', img: 'assets/sample-salon.jpg', alt: 'Salon beauty portrait' },
{ label: 'Real Estate', icon: '🏡', img: 'assets/sample-realestate.jpg', alt: 'Real estate property' },
{ label: 'Fashion Brand', icon: '👗', img: 'assets/sample-fashion.jpg', alt: 'Fashion brand street style' },
{ label: 'Tech Startup', icon: '💻', img: 'assets/sample-tech.jpg', alt: 'Tech startup product showcase' },
];

function initPortfolioCarousel() {
var track = document.getElementById('portfolio-track');
if (!track) return;
function makeSlide(item) {
var div = document.createElement('div');
div.className = 'portfolio-slide';
if (item.img) {
var img = document.createElement('img');
img.src = item.img;
img.alt = item.alt || item.label;
img.loading = 'lazy';
// If the sample image is missing, fall back to the icon/label
// placeholder instead of showing a broken-image icon.
img.addEventListener('error', function () {
img.remove();
var ph = document.createElement('div');
ph.className = 'portfolio-slide-placeholder';
ph.innerHTML = '<div class="ph-icon">' + item.icon + '</div><div class="ph-text">' + item.label + '</div>';
div.insertBefore(ph, div.firstChild);
});
div.appendChild(img);
} else {
var ph2 = document.createElement('div');
ph2.className = 'portfolio-slide-placeholder';
var icon = document.createElement('div');
icon.className = 'ph-icon';
icon.textContent = item.icon;
var txt = document.createElement('div');
txt.className = 'ph-text';
txt.textContent = item.label;
ph2.appendChild(icon);
ph2.appendChild(txt);
div.appendChild(ph2);
}
var label = document.createElement('div');
label.className = 'portfolio-slide-label';
label.textContent = item.label;
div.appendChild(label);
return div;
}
PORTFOLIO_SLIDES.forEach(function (s) { track.appendChild(makeSlide(s)); });
PORTFOLIO_SLIDES.forEach(function (s) { track.appendChild(makeSlide(s)); });
}

/* ── PAYMENT TICKER ── */
function initPaymentTicker() {
var track = document.getElementById('ticker-track');
if (!track) return;
function makeItem(method) {
var a = document.createElement('a');
a.href = method.url;
a.target = '_blank';
a.rel = 'noopener';
a.className = 'ticker-item ticker-logo-item';
a.title = method.name;
var cubeWrap = document.createElement('div');
cubeWrap.className = 'ticker-cube-wrap';
var scene = document.createElement('div');
scene.className = 'ticker-cube-scene';
var cube = document.createElement('div');
cube.className = 'ticker-mini-cube';
buildCube(cube, false);
scene.appendChild(cube);
cubeWrap.appendChild(scene);
a.appendChild(cubeWrap);
var logoWrap = document.createElement('div');
logoWrap.className = 'ticker-logo-wrap';
if (method.logo && typeof BANK_LOGOS !== 'undefined' && BANK_LOGOS[method.logo]) {
var img = document.createElement('img');
img.src = BANK_LOGOS[method.logo];
img.alt = method.name;
img.className = 'ticker-bank-img';
logoWrap.appendChild(img);
} else {
var emoji = document.createElement('span');
emoji.className = 'ticker-emoji';
emoji.textContent = method.emoji;
var txt = document.createElement('span');
txt.className = 'ticker-name';
txt.textContent = method.name;
logoWrap.appendChild(emoji);
logoWrap.appendChild(txt);
}
a.appendChild(logoWrap);
a.addEventListener('mouseenter', function () {
logoWrap.style.opacity = '0';
logoWrap.style.transform = 'scale(0.8)';
cubeWrap.style.opacity = '1';
cubeWrap.style.transform = 'scale(1)';
cube.style.animation = 'miniCubeSpin 1.2s linear infinite';
});
a.addEventListener('mouseleave', function () {
logoWrap.style.opacity = '1';
logoWrap.style.transform = 'scale(1)';
cubeWrap.style.opacity = '0';
cubeWrap.style.transform = 'scale(0.8)';
cube.style.animation = '';
});
return a;
}
if (typeof PAYMENT_METHODS !== 'undefined') {
PAYMENT_METHODS.forEach(function (m) { track.appendChild(makeItem(m)); });
PAYMENT_METHODS.forEach(function (m) { track.appendChild(makeItem(m)); });
} else {
console.warn('VECTUZ: PAYMENT_METHODS not found — make sure payment-methods.js is loaded before main.js.');
}
}

/* ── LOADER ── */
function initLoader() {
var loader = document.getElementById('loader');
var loaderCube = document.getElementById('loader-cube');
if (!loader || !loaderCube) return;
var hideTimeout = setTimeout(function () {
loader.classList.add('hidden');
}, 2900);
buildCube(loaderCube, false);
setTimeout(function () {
animateSolve(loaderCube, function () {
clearTimeout(hideTimeout);
loader.classList.add('hidden');
});
}, 150);
}

/* ── OFFLINE DETECTION ── */
function initOffline() {
var overlay = document.getElementById('offline-overlay');
var cube = document.getElementById('offline-cube');
if (!overlay || !cube) return;
function showOffline() {
buildCube(cube, false);
overlay.classList.add('show');
setTimeout(function () { scatterCube(cube); }, 700);
}
function hideOffline() {
overlay.classList.remove('show');
}
if (!navigator.onLine) showOffline();
window.addEventListener('offline', showOffline);
window.addEventListener('online', hideOffline);
}

/* ── PACKAGE DATA ──
   Prices lowered from the original launch pricing to be more
   competitive for Kenyan SMEs. Page counts and delivery-time claims
   below are kept in sync with the pricing cards in index.html AND
   with Terms & Conditions §5 (only Starter has a fixed day-count;
   everything else is scope-dependent and confirmed in writing). */
var PACKAGES = {
starter: {
name: 'Starter', price: 'KES 19,999', color: '#3a8fe8',
tagline: 'Your first professional step online.',
features: [
{ title: 'Up to 3 Pages', desc: 'A clean homepage plus two supporting pages (e.g. About and Contact). Perfect for a simple business presence.' },
{ title: 'Mobile-Responsive Design', desc: 'Your site will look great on phones, tablets, and desktops. Over 80% of Kenyan users browse on mobile.' },
{ title: 'Contact Form', desc: 'Customers can send you messages directly from the website. You receive them in your email.' },
{ title: 'Social Media Links', desc: 'Connect your Instagram, Facebook, X, or WhatsApp so visitors can follow and reach you instantly.' },
{ title: 'Google Maps Integration', desc: 'Show your exact business location on the site. Customers can get directions with one tap.' },
{ title: 'Free Domain Hosting (1 Year)', desc: 'Your site goes live on its own domain, hosted free for the first year.' },
{ title: '5-Day Delivery', desc: 'Your fully built website delivered and ready to launch within 5 business days of deposit and content submission.' },
],
},
business: {
name: 'Business', price: 'KES 59,999', color: '#00e87a',
tagline: 'Sell online. Get paid. Grow faster.',
features: [
{ title: 'Up to 15 Pages', desc: 'Full multi-page website — Home, About, Services, Blog, Gallery, Contact and more.' },
{ title: 'E-Commerce / Online Store', desc: 'Sell your products or services directly from your website. Includes product listings, cart, and checkout flow.' },
{ title: 'M-Pesa & Card Checkout', desc: 'Customers can pay via M-Pesa STK push, debit/credit cards, and mobile money — directly on your site.' },
{ title: 'Custom Animations', desc: 'Smooth scroll effects, hover interactions, and entrance animations that make your site feel premium.' },
{ title: 'WhatsApp Chat Button', desc: 'A floating WhatsApp button so customers can message you instantly from any page.' },
{ title: 'Scope-Based Delivery Timeline', desc: 'Your delivery date is confirmed in writing after we review your project scope — see our Process section for what to expect.' },
{ title: '1 Month Free Support', desc: 'After launch, we handle bug fixes and minor updates for 30 days at no extra charge.' },
],
},
premium: {
name: 'Premium', price: 'KES 99,999', color: '#f5c842',
tagline: 'Enterprise power. Kenyan price.',
features: [
{ title: 'Unlimited Pages', desc: 'No page limit. Build as large a website as your business requires.' },
{ title: 'Full Custom Design System', desc: 'We build you a complete visual identity system — fonts, colours, spacing, components.' },
{ title: 'Booking / Inventory Systems', desc: 'Let customers book appointments, reserve products, or manage stock — automated and integrated.' },
{ title: 'Admin Dashboard', desc: 'A private dashboard where you manage orders, bookings, content, and customers.' },
{ title: 'API Integrations', desc: 'Connect your site to external services — Google Calendar, SMS gateways, accounting tools, CRMs, and more.' },
{ title: '3 Months Support', desc: 'Three full months of post-launch support. Bug fixes, updates, and guidance included throughout.' },
{ title: 'Priority Delivery', desc: 'Your project jumps to the front of the queue. Faster turnaround, confirmed in writing once we scope your project.' },
],
},
max: {
name: 'MAX', price: 'KES 150k–400k', color: '#9b5de5',
tagline: 'Total digital transformation.',
features: [
{ title: 'Custom Web Application', desc: 'A fully bespoke web app built around your business processes — portals, dashboards, automation, workflows.' },
{ title: 'Android + iOS Mobile App', desc: "Your business in your customers' pockets. Native mobile app published on Google Play and App Store." },
{ title: 'M-Pesa Daraja API Integration', desc: "Direct integration with Safaricom's Daraja API — STK Push, C2B, B2C, and transaction callbacks." },
{ title: 'Inventory & CRM System', desc: 'Track your stock, manage customer relationships, and automate follow-ups — all in one place.' },
{ title: 'WhatsApp Business API', desc: 'Automated WhatsApp messaging — order confirmations, reminders, customer support bots.' },
{ title: 'Full Brand Identity Design', desc: 'Logo, colour palette, typography, business cards, letterheads — your complete visual brand.' },
{ title: 'Staff Login & Roles System', desc: 'Multiple team members with different access levels — admins, managers, editors, viewers.' },
{ title: 'SEO & Google Ranking Setup', desc: 'Technical SEO, keyword targeting, Google Search Console setup, and sitemap submission.' },
{ title: 'Google Business Profile', desc: 'Full setup and optimisation of your Google Business listing so customers find you on Maps.' },
{ title: 'Analytics & Reporting Dashboard', desc: 'Real-time data on visitors, sales, conversions, and performance — all in a clean dashboard.' },
{ title: 'Staff Training', desc: 'We train your team to use and manage the system confidently. Includes documentation.' },
{ title: '6 Months Dedicated Support', desc: 'Six months of priority support — your dedicated point of contact for anything you need.' },
],
},
review: {
name: 'Web Review', price: 'KES 0', color: '#2dd9c4',
tagline: "It's free. We just want to show you what's possible.",
features: [
{ title: 'Full Walkthrough', desc: 'We go through your existing website page by page, the way a real customer would.' },
{ title: 'Mock-Up Analysis', desc: 'We put together a quick visual mock-up showing exactly how a few key improvements would look.' },
{ title: 'Conversion Trouble Spots', desc: 'We flag the specific things most likely costing you customers — slow load times, confusing navigation, weak calls-to-action, and more.' },
{ title: 'No Obligation', desc: 'You keep the feedback either way. If you want us to build the improvements, great — if not, that\'s fine too.' },
],
},
};

/* ── PACKAGE MODAL ──
   Every tier now animates the exact same way: a CSS-only Rubik's
   cube that loops scramble → solve → scramble for as long as the
   modal is open. There is no longer a separate WebGL "energy cube"
   path for Premium/MAX. */
function initPackageModals() {
var modal = document.getElementById('package-modal');
var modalCube = document.getElementById('modal-cube');
var modalBody = document.getElementById('modal-body');
var closeBtn = document.getElementById('modal-close');
if (!modal) return;
var loopActive = false;
var energyTimers = [];

function clearEnergyTimers() {
energyTimers.forEach(function (t) { clearTimeout(t); });
energyTimers = [];
}

function openModal(packageKey) {
var pkg = PACKAGES[packageKey];
if (!pkg) return;
var featuresHTML = pkg.features.map(function (f) {
return '<div class="modal-feature">' +
'<div class="modal-feature-title" style="color:' + pkg.color + '">✓ ' + f.title + '</div>' +
'<div class="modal-feature-desc">' + f.desc + '</div>' +
'</div>';
}).join('');
modalBody.innerHTML =
'<div class="modal-header">' +
'<div class="modal-plan-name" style="color:' + pkg.color + '">' + pkg.name + '</div>' +
'<div class="modal-plan-price">' + pkg.price + '</div>' +
'<p class="modal-tagline">' + pkg.tagline + '</p>' +
'</div>' +
'<div class="modal-features-grid">' + featuresHTML + '</div>' +
'<a href="#contact" class="modal-cta" style="background:' + pkg.color + ';color:' +
(packageKey === 'max' || packageKey === 'premium' ? '#fff' : '#090b0e')
+ '" id="modal-cta-btn">Get Started →</a>';
modal.classList.add('show');
document.body.style.overflow = 'hidden';
loopActive = true;

buildCube(modalCube, false);
modalCube.style.display = '';
var t1 = setTimeout(function () { scatterCubeModal(modalCube); }, 350);
var t2 = setTimeout(function () {
buildCube(modalCube, false);
loopSolve();
}, 1600);
energyTimers.push(t1, t2);

function loopSolve() {
if (!loopActive) return;
animateSolve(modalCube, function () {
if (!loopActive) return;
var t = setTimeout(function () {
animateUnsolve(modalCube, function () {
if (!loopActive) return;
var t2b = setTimeout(loopSolve, 600);
energyTimers.push(t2b);
});
}, 800);
energyTimers.push(t);
});
}

var t3 = setTimeout(function () {
var ctaBtn = document.getElementById('modal-cta-btn');
if (ctaBtn) {
ctaBtn.addEventListener('click', function (e) {
e.preventDefault();
closeModal();
var contact = document.getElementById('contact');
if (contact) window.scrollTo({ top: contact.offsetTop - 90, behavior: 'smooth' });
});
}
}, 100);
energyTimers.push(t3);
}

function scatterCubeModal(cube) {
var faces = cube.querySelectorAll('.cube-face');
faces.forEach(function (face) {
var rx = (Math.random() - 0.5) * 300;
var ry = (Math.random() - 0.5) * 300;
var rot = Math.random() * 540;
face.style.transition = 'transform 0.9s cubic-bezier(.25,1,.3,1), opacity 0.9s cubic-bezier(.25,1,.3,1)';
face.style.transform += ' translate3d(' + rx + 'px,' + ry + 'px,0) rotate(' + rot + 'deg)';
face.style.opacity = '0';
});
}

function closeModal() {
loopActive = false;
clearEnergyTimers();
modal.classList.remove('show');
document.body.style.overflow = '';
modalCube.style.display = '';
}

document.querySelectorAll('.learn-more-btn').forEach(function (btn) {
btn.addEventListener('click', function (e) {
e.preventDefault();
e.stopPropagation();
var key = btn.getAttribute('data-package');
if (key === 'max') {
btn.classList.remove('pop-punch');
void btn.offsetWidth;
btn.classList.add('pop-punch');
}
openModal(key);
});
});

closeBtn.addEventListener('click', closeModal);
var backdrop = modal.querySelector('.modal-backdrop');
if (backdrop) backdrop.addEventListener('click', closeModal);
}

/* ── SUCCESS OVERLAY ── */
function initSuccessOverlay() {
var overlay = document.getElementById('form-success-overlay');
var cube = document.getElementById('success-cube');
if (!overlay || !cube) return;
var loopActive = false;
window.showSuccessOverlay = function () {
buildCube(cube, false);
overlay.classList.add('show');
loopActive = true;
function loop() {
if (!loopActive) return;
animateSolve(cube, function () {
if (!loopActive) return;
setTimeout(function () {
animateUnsolve(cube, function () {
if (!loopActive) return;
setTimeout(loop, 600);
});
}, 800);
});
}
loop();
setTimeout(function () {
loopActive = false;
overlay.classList.remove('show');
}, 5000);
};
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
var targets = document.querySelectorAll(
'.service-card, .pricing-card, .process-step, .why-point, .stat, .testimonial-card, .faq-item'
);
var observer = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.style.opacity = '1';
entry.target.style.transform = 'translateY(0) scale(1)';
observer.unobserve(entry.target);
}
});
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
targets.forEach(function (el, i) {
el.style.opacity = '0';
el.style.transform = 'translateY(28px) scale(.98)';
el.style.transition =
'opacity 0.7s ' + (i * 0.05) + 's cubic-bezier(.34,1.56,.64,1), ' +
'transform 0.7s ' + (i * 0.05) + 's cubic-bezier(.34,1.56,.64,1)';
observer.observe(el);
});
}

/* ── IOS-STYLE REVEAL (elements with class "ios-reveal") ──
   The site markup (feature cards, hero elements, portal/auth cards)
   uses an "ios-reveal" class that starts hidden and needs an
   "in-view" class added once scrolled into view — this was
   previously expected from a "vectuz-upgrade.js" file that was
   referenced in index.html but never actually included, so these
   elements rendered permanently invisible (opacity:0). This restores
   that behaviour directly in main.js so nothing depends on a missing
   file anymore. */
function initIosReveal() {
var targets = document.querySelectorAll('.ios-reveal:not(.in-view)');
if (!targets.length) return;
var observer = new IntersectionObserver(function (entries) {
entries.forEach(function (entry) {
if (entry.isIntersecting) {
entry.target.classList.add('in-view');
observer.unobserve(entry.target);
}
});
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
targets.forEach(function (el) { observer.observe(el); });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
a.addEventListener('click', function (e) {
var target = document.querySelector(a.getAttribute('href'));
if (target) {
e.preventDefault();
window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
}
});
});
}

/* ── COUNTERS ── */
function animateCounters() {
document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
var target = parseFloat(el.dataset.target);
var suffix = el.dataset.suffix || '';
var duration = 1800;
var start = performance.now();
var isInt = Number.isInteger(target);
function update(now) {
var progress = Math.min((now - start) / duration, 1);
var eased = 1 - Math.pow(1 - progress, 3);
var val = target * eased;
el.textContent = (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
if (progress < 1) requestAnimationFrame(update);
}
requestAnimationFrame(update);
});
}

/* ── CONTACT FORM ── */
function initForm() {
var form = document.getElementById('contact-form');
if (!form) return;
form.addEventListener('submit', async function (e) {
e.preventDefault();
var btn = form.querySelector('.form-submit');
var originalText = btn.textContent;
btn.textContent = 'Sending...';
btn.disabled = true;
var googleScriptUrl =
'https://script.google.com/macros/s/AKfycby6mIxaLXiOa0ZqxL93uf31KNtOeMVvJ3s2Bo4QzW_dhAEeytwcyh5dv1DIpI13HLmZAg/exec';
try {
await fetch(googleScriptUrl, { method: 'POST', mode: 'no-cors', body: new FormData(form) });
form.reset();
if (window.showSuccessOverlay) window.showSuccessOverlay();
} catch (err) {
btn.textContent = '❌ Error. Try again.';
btn.style.background = '#e84444';
btn.style.color = '#fff';
} finally {
setTimeout(function () {
btn.textContent = originalText;
btn.style.background = '';
btn.style.color = '';
btn.disabled = false;
}, 4000);
}
});
}

/* ── NAV OFFSET ── */
function initNavOffset() {
var banner = document.querySelector('.discount-banner');
var nav = document.querySelector('nav');
if (!banner || !nav) return;
var h = banner.offsetHeight;
nav.style.top = h + 'px';
window.addEventListener('scroll', function () {
nav.style.top = window.scrollY > h ? '0' : (h - window.scrollY) + 'px';
});
}

/* ── THEME TOGGLE ── */
function initThemeToggle() {
var btn = document.getElementById('theme-toggle');
if (!btn) return;
var icon = btn.querySelector('.toggle-icon');
function getCurrentTheme() {
return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}
function applyTheme(theme) {
if (theme === 'light') {
document.documentElement.setAttribute('data-theme', 'light');
} else {
document.documentElement.removeAttribute('data-theme');
}
localStorage.setItem('theme', theme);
if (icon) icon.textContent = theme === 'light' ? '☀️' : '🌙';
}
applyTheme(getCurrentTheme());
btn.addEventListener('click', function () {
applyTheme(getCurrentTheme() === 'dark' ? 'light' : 'dark');
});
}

/* ── TERMS MODAL ── */
function initTermsModal() {
var openBtn = document.getElementById('open-terms');
var openBtnBanner = document.getElementById('open-terms-banner');
var modal = document.getElementById('terms-modal');
var closeBtn = document.getElementById('terms-close');
var ctaBtn = document.getElementById('terms-cta-btn');
if (!modal) return;
function openTerms(e) {
if (e) e.preventDefault();
modal.classList.add('show');
document.body.style.overflow = 'hidden';
}
function closeTerms() {
modal.classList.remove('show');
document.body.style.overflow = '';
}
if (openBtn) openBtn.addEventListener('click', openTerms);
if (openBtnBanner) openBtnBanner.addEventListener('click', openTerms);
if (closeBtn) closeBtn.addEventListener('click', closeTerms);
if (ctaBtn) ctaBtn.addEventListener('click', closeTerms);
var backdrop = modal.querySelector('.terms-backdrop');
if (backdrop) backdrop.addEventListener('click', closeTerms);
}

/* ── FAQ ACCORDION ── */
function initFAQ() {
var items = document.querySelectorAll('.faq-item');
if (!items.length) return;
items.forEach(function (item) {
var question = item.querySelector('.faq-question');
var answer = item.querySelector('.faq-answer');
if (!question || !answer) return;
question.addEventListener('click', function () {
var isOpen = item.classList.contains('open');
items.forEach(function (other) {
other.classList.remove('open');
other.querySelector('.faq-answer').style.maxHeight = '0px';
});
if (!isOpen) {
item.classList.add('open');
answer.style.maxHeight = answer.scrollHeight + 'px';
}
});
});
}

/* ── PRICING CARD CLICK ── */
function initPricingCardClick() {
document.querySelectorAll('.pricing-card').forEach(function (card) {
card.addEventListener('click', function (e) {
if (e.target.classList.contains('learn-more-btn')) return;
var key = card.getAttribute('data-package');
if (key) {
var modal = document.getElementById('package-modal');
if (modal && !modal.classList.contains('show')) {
var btn = card.querySelector('.learn-more-btn');
if (btn) btn.click();
}
}
});
});
}

/* ── HERO DEVICE: live scroll-mock + optional real video override ──
   Builds the always-on CSS "site being scrolled" preview inside the
   phone screen. If assets/hero-demo.mp4 exists and loads successfully,
   it fades in on top and takes over; otherwise the CSS mock just
   keeps playing, so the hero section never shows a blank/broken
   screen while you're waiting to record a real clip. */
function initHeroDevice() {
var screen = document.querySelector('.hero-device-screen');
if (!screen) return;

var mock = document.createElement('div');
mock.className = 'hero-scroll-mock';
mock.innerHTML =
'<div class="hsm-bar">' +
'<span class="hsm-dot red"></span><span class="hsm-dot gold"></span><span class="hsm-dot green"></span>' +
'<span class="hsm-url">vectuz.xyz</span>' +
'</div>' +
'<div class="hsm-cursor"></div>' +
'<div class="hsm-track">' +
buildHsmPage() + buildHsmPage() +
'</div>';
screen.insertBefore(mock, screen.firstChild);

function buildHsmPage() {
return '<div class="hsm-page">' +
'<div class="hsm-hero-block">' +
'<div class="hsm-line tag"></div>' +
'<div class="hsm-line h1"></div>' +
'<div class="hsm-line h1 short"></div>' +
'<div class="hsm-line sub"></div>' +
'<div class="hsm-btn"></div>' +
'</div>' +
'<div class="hsm-cards"><div class="hsm-card"></div><div class="hsm-card"></div><div class="hsm-card"></div></div>' +
'<div class="hsm-banner"></div>' +
'<div class="hsm-cards two"><div class="hsm-card"></div><div class="hsm-card"></div></div>' +
'<div class="hsm-footer"></div>' +
'</div>';
}

var video = screen.querySelector('video');
if (!video) return;
video.addEventListener('loadeddata', function () {
video.style.position = 'relative';
video.style.zIndex = '2';
mock.style.display = 'none';
});
video.addEventListener('error', function () {
video.remove();
});
// If there's no real source configured, don't leave a dead <video> tag around
var hasSource = video.querySelector('source') && video.querySelector('source').getAttribute('src');
if (!hasSource) video.remove();
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function () {
initLoader();
initPaymentTicker();
initPortfolioCarousel();
initOffline();
initSuccessOverlay();
initPackageModals();
initPricingCardClick();
initSmoothScroll();
initScrollReveal();
initForm();
initNavOffset();
initThemeToggle();
initTermsModal();
initFAQ();
initHeroDevice();
initIosReveal();
var statsBar = document.querySelector('.stats-bar');
if (statsBar) {
var obs = new IntersectionObserver(function (entries) {
if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
}, { threshold: 0.5 });
obs.observe(statsBar);
}
});
