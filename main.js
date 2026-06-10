/* ═══════════════════════════════════════════
   VECTUZ — main.js
   ═══════════════════════════════════════════ */

/* ── THEME GUARD ── */
(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

/* ── CUBE COLOURS ── */
const SCRAMBLED = {
  front:  ['#e84444','#f5c842','#3a8fe8','#00c853','#f0ece4','#e87a00','#3a8fe8','#e84444','#f5c842'],
  back:   ['#f5c842','#e84444','#f0ece4','#e87a00','#3a8fe8','#00c853','#e87a00','#f5c842','#e84444'],
  right:  ['#3a8fe8','#00c853','#e84444','#f5c842','#e87a00','#e84444','#f0ece4','#3a8fe8','#00c853'],
  left:   ['#00c853','#e87a00','#f5c842','#3a8fe8','#e84444','#f5c842','#e87a00','#f0ece4','#3a8fe8'],
  top:    ['#f5c842','#3a8fe8','#e87a00','#e84444','#f0ece4','#3a8fe8','#00c853','#e84444','#f5c842'],
  bottom: ['#f0ece4','#00c853','#3a8fe8','#f5c842','#e84444','#e87a00','#3a8fe8','#f0ece4','#00c853'],
};
const SOLVED = {
  front:  Array(9).fill('#e84444'),
  back:   Array(9).fill('#e87a00'),
  right:  Array(9).fill('#3a8fe8'),
  left:   Array(9).fill('#00c853'),
  top:    Array(9).fill('#f5c842'),
  bottom: Array(9).fill('#f0ece4'),
};

/* ── BUILD CUBE ── */
function buildCube(container, startSolved) {
  container.innerHTML = '';
  const faces = ['front','back','right','left','top','bottom'];
  const colours = startSolved ? SOLVED : SCRAMBLED;
  faces.forEach(function(faceName) {
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
  faces.forEach(function(face, fi) {
    var faceName = face.dataset.face;
    face.querySelectorAll('.cubie').forEach(function(cubie, ci) {
      setTimeout(function() {
        cubie.style.background = SOLVED[faceName][ci];
        cubie.style.transform = 'scale(1.1)';
        setTimeout(function() { cubie.style.transform = 'scale(1)'; }, 120);
      }, fi * 180 + ci * 55);
    });
  });
  var total = 6 * 180 + 9 * 55 + 500;
  if (onDone) setTimeout(onDone, total);
}

/* ── ANIMATE: solved → scrambled ── */
function animateUnsolve(cube, onDone) {
  var faces = cube.querySelectorAll('.cube-face');
  faces.forEach(function(face, fi) {
    var faceName = face.dataset.face;
    face.querySelectorAll('.cubie').forEach(function(cubie, ci) {
      setTimeout(function() {
        cubie.style.background = SCRAMBLED[faceName][ci];
        cubie.style.transform = 'scale(1.1)';
        setTimeout(function() { cubie.style.transform = 'scale(1)'; }, 120);
      }, fi * 180 + ci * 55);
    });
  });
  var total = 6 * 180 + 9 * 55 + 500;
  if (onDone) setTimeout(onDone, total);
}

/* ── SCATTER (offline disassemble effect) ── */
function scatterCube(cube) {
  var cubies = cube.querySelectorAll('.cubie');
  cubies.forEach(function(c) {
    var rx = (Math.random() - 0.5) * 200;
    var ry = (Math.random() - 0.5) * 200;
    var rz = (Math.random() - 0.5) * 200;
    var rot = Math.random() * 720;
    c.style.transition = 'transform 1s ease, opacity 1s ease';
    c.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,' + rz + 'px) rotate(' + rot + 'deg)';
    c.style.opacity = '0.3';
  });
}

/* ── LOADER ── */
function initLoader() {
  var loader = document.getElementById('loader');
  var loaderCube = document.getElementById('loader-cube');
  if (!loader || !loaderCube) return;
  buildCube(loaderCube, false);
  setTimeout(function() {
    animateSolve(loaderCube, function() {
      setTimeout(function() {
        loader.classList.add('hidden');
      }, 300);
    });
  }, 500);
}

/* ── OFFLINE DETECTION ── */
function initOffline() {
  var overlay = document.getElementById('offline-overlay');
  var cube = document.getElementById('offline-cube');
  if (!overlay || !cube) return;

  function showOffline() {
    buildCube(cube, false);
    overlay.classList.add('show');
    setTimeout(function() { scatterCube(cube); }, 600);
  }

  function hideOffline() {
    overlay.classList.remove('show');
  }

  if (!navigator.onLine) showOffline();
  window.addEventListener('offline', showOffline);
  window.addEventListener('online', hideOffline);
}

/* ── PACKAGE DATA ── */
var PACKAGES = {
  starter: {
    name: 'Starter',
    price: 'KES 24,599',
    color: '#3a8fe8',
    tagline: 'Your first professional step online.',
    features: [
      { title: 'Up to 2 Pages', desc: 'A clean homepage and one supporting page (e.g. About or Contact). Perfect for simple business presence.' },
      { title: 'Mobile-Responsive Design', desc: 'Your site will look great on phones, tablets, and desktops. Over 80% of Kenyan users browse on mobile.' },
      { title: 'Contact Form', desc: 'Customers can send you messages directly from the website. You receive them in your email.' },
      { title: 'Social Media Links', desc: 'Connect your Instagram, Facebook, X, or WhatsApp so visitors can follow and reach you instantly.' },
      { title: 'Google Maps Integration', desc: 'Show your exact business location on the site. Customers can get directions with one tap.' },
      { title: '5-Day Delivery', desc: 'Your fully built website delivered and ready to launch within 5 business days of deposit and content submission.' }
    ]
  },
  business: {
    name: 'Business',
    price: 'KES 74,999',
    color: '#00e87a',
    tagline: 'Sell online. Get paid. Grow faster.',
    features: [
      { title: 'Up to 15 Pages', desc: 'Full multi-page website — Home, About, Services, Blog, Gallery, Contact and more. Everything your business needs.' },
      { title: 'E-Commerce / Online Store', desc: 'Sell your products or services directly from your website. Includes product listings, cart, and checkout flow.' },
      { title: 'M-Pesa & Card Checkout', desc: 'Customers can pay via M-Pesa STK push, debit/credit cards, and mobile money — directly on your site.' },
      { title: 'Custom Animations', desc: 'Smooth scroll effects, hover interactions, and entrance animations that make your site feel premium and engaging.' },
      { title: 'WhatsApp Chat Button', desc: 'A floating WhatsApp button so customers can message you instantly from any page — increases conversions significantly.' },
      { title: '7 Business Days Delivery', desc: 'Full e-commerce site delivered within 7 business days. Speed without compromising quality.' },
      { title: '1 Month Free Support', desc: 'After launch, we handle bug fixes and minor updates for 30 days at no extra charge.' }
    ]
  },
  premium: {
    name: 'Premium',
    price: 'KES 120,000',
    color: '#f5c842',
    tagline: 'Enterprise power. Kenyan price.',
    features: [
      { title: 'Unlimited Pages', desc: 'No page limit. Build as large a website as your business requires — service pages, landing pages, blogs, portals.' },
      { title: 'Full Custom Design System', desc: 'We build you a complete visual identity system — fonts, colours, spacing, components — consistent across every page.' },
      { title: 'Booking / Inventory Systems', desc: 'Let customers book appointments, reserve products, or manage stock — automated and integrated into your site.' },
      { title: 'Admin Dashboard', desc: 'A private dashboard where you manage orders, bookings, content, and customers — no technical skills required.' },
      { title: 'API Integrations', desc: 'Connect your site to external services — Google Calendar, SMS gateways, accounting tools, CRMs, and more.' },
      { title: '3 Months Support', desc: 'Three full months of post-launch support. Bug fixes, updates, and guidance included throughout.' },
      { title: 'Priority Delivery', desc: 'Your project jumps to the front of the queue. Faster turnaround guaranteed.' }
    ]
  },
  max: {
    name: 'MAX',
    price: 'KES 200k–300k',
    color: '#e84444',
    tagline: 'Total digital transformation.',
    features: [
      { title: 'Custom Web Application', desc: 'A fully bespoke web app built around your business processes — portals, dashboards, automation, workflows.' },
      { title: 'Android + iOS Mobile App', desc: 'Your business in your customers\' pockets. Native mobile app published on Google Play and App Store.' },
      { title: 'M-Pesa Daraja API Integration', desc: 'Direct integration with Safaricom\'s Daraja API — STK Push, C2B, B2C, and transaction callbacks all handled.' },
      { title: 'Inventory & CRM System', desc: 'Track your stock, manage customer relationships, and automate follow-ups — all in one place.' },
      { title: 'WhatsApp Business API', desc: 'Automated WhatsApp messaging — order confirmations, reminders, customer support bots.' },
      { title: 'Full Brand Identity Design', desc: 'Logo, colour palette, typography, business cards, letterheads — your complete visual brand.' },
      { title: 'Staff Login & Roles System', desc: 'Multiple team members with different access levels — admins, managers, editors, viewers.' },
      { title: 'SEO & Google Ranking Setup', desc: 'Technical SEO, keyword targeting, Google Search Console setup, and sitemap submission.' },
      { title: 'Google Business Profile', desc: 'Full setup and optimisation of your Google Business listing so customers find you on Maps.' },
      { title: 'Analytics & Reporting Dashboard', desc: 'Real-time data on visitors, sales, conversions, and performance — all in a clean dashboard.' },
      { title: 'Staff Training', desc: 'We train your team to use and manage the system confidently. Includes documentation.' },
      { title: '6 Months Dedicated Support', desc: 'Six months of priority support — your dedicated point of contact for anything you need.' }
    ]
  }
};
/* ── PACKAGE MODAL ── */
function initPackageModals() {
  var modal = document.getElementById('package-modal');
  var modalCube = document.getElementById('modal-cube');
  var modalBody = document.getElementById('modal-body');
  var closeBtn = document.getElementById('modal-close');
  if (!modal) return;

  var loopActive = false;

  function openModal(packageKey) {
    var pkg = PACKAGES[packageKey];
    if (!pkg) return;

    // Build modal body
    var featuresHTML = pkg.features.map(function(f) {
      return '<div class="modal-feature"><div class="modal-feature-title" style="color:' + pkg.color + '">✓ ' + f.title + '</div><div class="modal-feature-desc">' + f.desc + '</div></div>';
    }).join('');

    modalBody.innerHTML = '<div class="modal-header"><div class="modal-plan-name" style="color:' + pkg.color + '">' + pkg.name + '</div><div class="modal-plan-price">' + pkg.price + '</div><p class="modal-tagline">' + pkg.tagline + '</p></div><div class="modal-features-grid">' + featuresHTML + '</div><a href="#contact" class="modal-cta" style="background:' + pkg.color + '" id="modal-cta-btn">Get Started →</a>';

    // Build and animate cube
    buildCube(modalCube, false);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    loopActive = true;

    // Scatter first, then solve loop
    setTimeout(function() { scatterCubeModal(modalCube); }, 300);
    setTimeout(function() {
      buildCube(modalCube, false);
      loopSolve();
    }, 1400);

    function loopSolve() {
      if (!loopActive) return;
      animateSolve(modalCube, function() {
        if (!loopActive) return;
        setTimeout(function() {
          animateUnsolve(modalCube, function() {
            if (!loopActive) return;
            setTimeout(loopSolve, 500);
          });
        }, 700);
      });
    }

    // CTA closes modal and scrolls to contact
    setTimeout(function() {
      var ctaBtn = document.getElementById('modal-cta-btn');
      if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
          e.preventDefault();
          closeModal();
          var contact = document.getElementById('contact');
          if (contact) window.scrollTo({ top: contact.offsetTop - 90, behavior: 'smooth' });
        });
      }
    }, 100);
  }

  function scatterCubeModal(cube) {
    var faces = cube.querySelectorAll('.cube-face');
    faces.forEach(function(face, fi) {
      var rx = (Math.random() - 0.5) * 300;
      var ry = (Math.random() - 0.5) * 300;
      var rot = Math.random() * 540;
      face.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
      face.style.transform += ' translate3d(' + rx + 'px,' + ry + 'px,0) rotate(' + rot + 'deg)';
      face.style.opacity = '0';
    });
  }

  function closeModal() {
    loopActive = false;
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Learn more buttons
  document.querySelectorAll('.learn-more-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      openModal(btn.dataset.package);
    });
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Backdrop click closes
  modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
}
/* ── SUCCESS OVERLAY ── */
function initSuccessOverlay() {
  var overlay = document.getElementById('form-success-overlay');
  var cube = document.getElementById('success-cube');
  if (!overlay || !cube) return;
  var loopActive = false;

  window.showSuccessOverlay = function() {
    buildCube(cube, false);
    overlay.classList.add('show');
    loopActive = true;

    function loop() {
      if (!loopActive) return;
      animateSolve(cube, function() {
        if (!loopActive) return;
        setTimeout(function() {
          animateUnsolve(cube, function() {
            if (!loopActive) return;
            setTimeout(loop, 500);
          });
        }, 700);
      });
    }
    loop();

    setTimeout(function() {
      loopActive = false;
      overlay.classList.remove('show');
    }, 5000);
  };
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  var targets = document.querySelectorAll('.service-card, .pricing-card, .process-step, .why-point, .stat');
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach(function(el, i) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity 0.5s ' + (i * 0.05) + 's ease, transform 0.5s ' + (i * 0.05) + 's ease';
    observer.observe(el);
  });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
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
  document.querySelectorAll('.stat-num[data-target]').forEach(function(el) {
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
  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = form.querySelector('.form-submit');
    var originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;
    var googleScriptUrl = "https://script.google.com/macros/s/AKfycby6mIxaLXiOa0ZqxL93uf31KNtOeMVvJ3s2Bo4QzW_dhAEeytwcyh5dv1DIpI13HLmZAg/exec";
    try {
      await fetch(googleScriptUrl, { method: 'POST', mode: 'no-cors', body: new FormData(form) });
      form.reset();
      if (window.showSuccessOverlay) window.showSuccessOverlay();
    } catch(err) {
      btn.textContent = '❌ Error. Try again.';
      btn.style.background = '#e84444';
      btn.style.color = '#fff';
    } finally {
      setTimeout(function() {
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
  window.addEventListener('scroll', function() {
    nav.style.top = window.scrollY > h ? '0' : (h - window.scrollY) + 'px';
  });
}

/* ── THEME TOGGLE ── */
function initThemeToggle() {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var icon = btn.querySelector('.toggle-icon');
  var current = document.documentElement.getAttribute('data-theme') || 'dark';
  if (icon) icon.textContent = current === 'light' ? '☀️' : '🌙';
  btn.addEventListener('click', function() {
    var theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      if (icon) icon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'dark');
      if (icon) icon.textContent = '🌙';
    }
  });
}

/* ── TERMS MODAL ── */
function initTermsModal() {
  var openBtn = document.getElementById('open-terms');
  var modal = document.getElementById('terms-modal');
  var closeBtn = document.getElementById('terms-close');
  var ctaBtn = document.getElementById('terms-cta-btn');
  if (!openBtn || !modal) return;

  openBtn.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });

  function closeTerms() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeTerms);
  if (ctaBtn) ctaBtn.addEventListener('click', function() { closeTerms(); });
  modal.querySelector('.terms-backdrop').addEventListener('click', closeTerms);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  initLoader();
  initOffline();
  initSuccessOverlay();
  initPackageModals();
  initSmoothScroll();
  initScrollReveal();
  initForm();
  initNavOffset();
  initThemeToggle();
  initTermsModal();

  var statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    var obs = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(statsBar);
  }
});