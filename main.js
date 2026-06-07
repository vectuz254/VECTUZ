/* ═══════════════════════════════════════════
   VECTUZ — main.js
   ═══════════════════════════════════════════ */

/* ── CUBE COLOURS (scrambled state per face) ── */
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
function buildCube(container) {
  const faces = ['front','back','right','left','top','bottom'];
  faces.forEach(faceName => {
    const face = document.createElement('div');
    face.className = `cube-face ${faceName}`;
    face.dataset.face = faceName;
    for (let i = 0; i < 9; i++) {
      const cubie = document.createElement('div');
      cubie.className = 'cubie';
      cubie.dataset.index = i;
      cubie.style.background = SCRAMBLED[faceName][i];
      face.appendChild(cubie);
    }
    container.appendChild(face);
  });
}

/* ── SOLVE ANIMATION ── */
function solveCube(cube) {
  const btn = document.querySelector('.solve-btn');
  if (cube.classList.contains('solving')) return;

  btn.textContent = 'Solving…';
  btn.disabled = true;
  cube.classList.add('solving');

  // Animate cubies from scrambled → solved in staggered steps
  const faces = cube.querySelectorAll('.cube-face');
  faces.forEach((face, fi) => {
    const faceName = face.dataset.face;
    const cubies   = face.querySelectorAll('.cubie');
    cubies.forEach((cubie, ci) => {
      setTimeout(() => {
        cubie.style.background = SOLVED[faceName][ci];
        cubie.style.transform = 'scale(1.08)';
        setTimeout(() => { cubie.style.transform = 'scale(1)'; }, 120);
      }, fi * 200 + ci * 60);
    });
  });

  // After solve completes
  const totalTime = 6 * 200 + 9 * 60 + 500;
  setTimeout(() => {
    cube.classList.remove('solving');
    cube.classList.add('solved');
    btn.textContent = '✓ Solved!';
    btn.style.background = 'var(--green)';
    btn.style.color = 'var(--black)';
    btn.style.border = 'none';

    // Reset after 3s
    setTimeout(() => {
      cube.classList.remove('solved');
      const cubies = cube.querySelectorAll('.cubie');
      cube.querySelectorAll('.cube-face').forEach(face => {
        const faceName = face.dataset.face;
        face.querySelectorAll('.cubie').forEach((cubie, ci) => {
          cubie.style.background = SCRAMBLED[faceName][ci];
        });
      });
      btn.textContent = 'Solve It';
      btn.style.background = '';
      btn.style.color = '';
      btn.style.border = '';
      btn.disabled = false;
      cube.classList.remove('solving');
    }, 3000);
  }, totalTime);
}

/* ── LOADER ── */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  // Hide loader after 2.2s
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 2200);
}

/* ── SCROLL REVEAL ── */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.service-card, .pricing-card, .process-step, .why-point, .stat'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  targets.forEach((el, i) => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(28px)';
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

/* ── COUNTER ANIMATION ── */
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

/* ── CONTACT FORM (Formspree ready) ── */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;

    // Replace with your Formspree endpoint:
    // const res = await fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }
    // });

    // Simulate success for now
    await new Promise(r => setTimeout(r, 1000));
    btn.textContent = '✓ Message Sent!';
    btn.style.background = '#0f1318';
    btn.style.color = 'var(--green)';
    form.reset();
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
    if (window.scrollY > h) {
      nav.style.top = '0';
    } else {
      nav.style.top = (h - window.scrollY) + 'px';
    }
  });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Build cube
  const cubeEl = document.getElementById('rubiks-cube');
  if (cubeEl) buildCube(cubeEl);

  // Solve button
  const solveBtn = document.querySelector('.solve-btn');
  if (solveBtn && cubeEl) {
    solveBtn.addEventListener('click', () => solveCube(cubeEl));
  }

  initLoader();
  initSmoothScroll();
  initScrollReveal();
  initForm();
  initNavOffset();

  // Counter trigger on scroll
  const statsBar = document.querySelector('.stats-bar');
  if (statsBar) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { animateCounters(); obs.disconnect(); }
    }, { threshold: 0.5 });
    obs.observe(statsBar);
  }
});
                 
