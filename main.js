/* ═══════════════════════════════════════════
   VECTUZ — main.js
   ═══════════════════════════════════════════ */

/* ── THEME GUARD (prevents flash on load) ── */
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

/* ── BUILD CUBE (works for loader, hero, success overlay) ── */
function buildCube(container, startSolved = false) {
  const faces = ['front','back','right','left','top','bottom'];
  const colours = startSolved ? SOLVED : SCRAMBLED;
  faces.forEach(faceName => {
    const face = document.createElement('div');
    face.className = `cube-face ${faceName}`;
    face.dataset.face = faceName;
    for (let i = 0; i < 9; i++) {
      const cubie = document.createElement('div');
      cubie.className = 'cubie';
      cubie.style.background = colours[faceName][i];
      face.appendChild(cubie);
    }
    container.appendChild(face);
  });
}

/* ── ANIMATE CUBE: scrambled → solved (one pass) ── */
function animateSolve(cube, onDone) {
  const faces = cube.querySelectorAll('.cube-face');
  faces.forEach((face, fi) => {
    const faceName = face.dataset.face;
    face.querySelectorAll('.cubie').forEach((cubie, ci) => {
      setTimeout(() => {
        cubie.style.background = SOLVED[faceName][ci];
        cubie.style.transform = 'scale(1.1)';
        setTimeout(() => { cubie.style.transform = 'scale(1)'; }, 120);
      }, fi * 180 + ci * 55);
    });
  });
  const total = 6 * 180 + 9 * 55 + 400;
  if (onDone) setTimeout(onDone, total);
  return total;
}

/* ── ANIMATE CUBE: solved → scrambled ── */
function animateUnsolve(cube, onDone) {
  const faces = cube.querySelectorAll('.cube-face');
  faces.forEach((face, fi) => {
    const faceName = face.dataset.face;
    face.querySelectorAll('.cubie').forEach((cubie, ci) => {
      setTimeout(() => {
        cubie.style.background = SCRAMBLED[faceName][ci];
        cubie.style.transform = 'scale(1.1)';
        setTimeout(() => { cubie.style.transform = 'scale(1)'; }, 120);
      }, fi * 180 + ci * 55);
    });
  });
  const total = 6 * 180 + 9 * 55 + 400;
  if (onDone) setTimeout(onDone, total);
}

/* ── LOADER ── */
function initLoader() {
  const loader = document.getElementById('loader');
  const loaderCube = document.getElementById('loader-cube');
  if (!loader || !loaderCube) return;

  // Build scrambled cube in loader
  buildCube(loaderCube, false);

  // Solve it while loading
  setTimeout(() => {
    animateSolve(loaderCube, () => {
      // After solved, hide loader
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 400);
    });
  }, 600);
}

/* ── SUCCESS OVERLAY (cube loop: solved ↔ unsolved) ── */
function initSuccessOverlay() {
  const overlay = document.getElementById('form-success-overlay');
  const cube    = document.getElementById('success-cube');
  if (!overlay || !cube) return;

  let loopActive = false;

  window.showSuccessOverlay = function() {
    // Clear and rebuild cube scrambled
    cube.innerHTML = '';
    buildCube(cube, false);
    overlay.classList.add('show');
    loopActive = true;

    function loop() {
      if (!loopActive) return;
      animateSolve(cube, () => {
        if (!loopActive) return;
        setTimeout(() => {
          animateUnsolve(cube, () => {
            if (!loopActive) return;
            setTimeout(loop, 600);
          });
        }, 800);
      });
    }
    loop();

    // Auto dismiss after 4s
    setTimeout(() => {
      loopActive = false;
      overlay.classList.remove('show');
    }, 4000);
  };
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .pricing-card, .process-step, .why-point, .stat'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity 0.5s ${i * 0.05}s ease, transform 0.5s ${i * 0.05}s ease`;
    observer.observe(el);
  });
}

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
      }
    });
  });
}

/* ── COUNTERS ── */
function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target   = parseFloat(el.dataset.target);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();
    const isInt    = Number.isInteger(target);
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      const val      = target * eased;
      el.textContent = (isInt ? Math.round(val) : val.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

/* ── CONTACT FORM ── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const googleScriptUrl = "https://script.google.com/macros/s/AKfycby6mIxaLXiOa0ZqxL93uf31KNtOeMVvJ3s2Bo4QzW_dhAEeytwcyh5dv1DIpI13HLmZAg/exec";

    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: new FormData(form)
      });
      form.reset();
      // Show cube success animation
      if (window.showSuccessOverlay) window.showSuccessOverlay();
    } catch (error) {
      console.error('Submission Error:', error);
      btn.textContent = '❌ Error. Try again.';
      btn.style.background = '#e84444';
      btn.style.color = '#fff';
    } finally {
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
      }, 4000);
    }
  });
}

/* ── NAV BANNER OFFSET ── */
function initNavOffset() {
  const banner = document.querySelector('.discount-banner');
  const nav    = document.querySelector('nav');
  if (!banner || !nav) return;
  const h = banner.offsetHeight;
  nav.style.top = h + 'px';
  window.addEventListener('scroll', () => {
    nav.style.top = window.scrollY > h ? '0' : (h - window.scrollY) + 'px';
  });
}

/* ── THEME TOGGLE ── */
function initThemeToggle() {
  const btn    = document.getElementById('theme-toggle');
  if (!btn) return;
  const icon   = btn.querySelector('.toggle-icon');
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  if (icon) icon.textContent = current === 'light' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
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

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initSuccessOverlay();
  initSmoothScroll();
  initScrollReveal();
  initForm();
  initNavOffset();
  initThemeToggle();

  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(statsBar);
  }
});
