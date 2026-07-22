/* ═══════════════════════════════════════════
VECTUZ — vectuz-upgrade.js
ALL upgrade behavior in one self-running file. Your existing main.js
is completely untouched — this file just adds a SECOND <script> tag:

  <script src="main.js"></script>
  <script src="vectuz-upgrade.js"></script>   <!-- add this line -->

It only activates elements that exist on the page, so it's safe to
include on index.html, auth.html, and portal.html alike.
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
  initIOSReveal();
  initHeroDeviceTilt();
  initPaymentShowcase();
});

/* ── Smooth iOS-style fade/slide-in for any element marked .ios-reveal ── */
function initIOSReveal() {
  var els = document.querySelectorAll('.ios-reveal');
  if (!els.length) return;
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { obs.observe(el); });
}

/* ── Hero 3D device: subtle tilt that follows the mouse ── */
function initHeroDeviceTilt() {
  var device = document.getElementById('hero-device');
  if (!device) return;
  var wrap = device.parentElement;
  wrap.addEventListener('mousemove', function (e) {
    var rect = wrap.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;
    var y = (e.clientY - rect.top) / rect.height - 0.5;
    device.style.transform =
      'rotateY(' + (-14 + x * 10) + 'deg) rotateX(' + (6 - y * 10) + 'deg)';
  });
  wrap.addEventListener('mouseleave', function () {
    device.style.transform = 'rotateY(-14deg) rotateX(6deg)';
  });
}

/* ── Payment showcase: duplicate the track once for a seamless infinite loop ── */
function initPaymentShowcase() {
  var track = document.getElementById('payment-showcase-track');
  if (!track || track.dataset.duplicated) return;
  track.innerHTML += track.innerHTML;
  track.dataset.duplicated = 'true';
}
