/*- THEME GUARD (prevents flash on load) -*/
(function() {
  const saved = localStorage.getItem('theme') || 'dark';
  if (saved === 'light') document.documentElement.setAttribute('data-theme', 'light');
})();

/*- CUBE COLOURS STRUCTURES -*/
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

/*- CORE CUBE UTILITIES -*/
function buildCube(container, startSolved = false) {
  const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
  const colours = startSolved ? SOLVED : SCRAMBLED;
  container.innerHTML = '';
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

function animateSolve(cube, onDone) {
  const faces = cube.querySelectorAll('.cube-face');
  faces.forEach((face, fi) => {
    const faceName = face.dataset.face;
    face.querySelectorAll('.cubie').forEach((cubie, ci) => {
      setTimeout(() => {
        cubie.style.background = SOLVED[faceName][ci];
        cubie.style.transform = 'scale(1.1)';
        setTimeout(() => { cubie.style.transform = 'scale(1)'; }, 120);
      }, fi * 150 + ci * 45);
    });
  });
  const total = 6 * 150 + 9 * 45 + 300;
  if (onDone) setTimeout(onDone, total);
  return total;
}

/*- LOADER -*/
function initLoader() {
  const loader = document.getElementById('loader');
  const loaderCube = document.getElementById('loader-cube');
  if (!loader || !loaderCube) return;
  buildCube(loaderCube, false);
  setTimeout(() => {
    animateSolve(loaderCube, () => {
      setTimeout(() => { loader.classList.add('hidden'); }, 300);
    });
  }, 400);
}

/*- UPDATE 2: OFFLINE NETWORK STATUS SYSTEM -*/
function initOfflineDetection() {
  const overlay = document.getElementById('offline-overlay');
  const cubeContainer = document.getElementById('offline-cube');
  if (!overlay || !cubeContainer) return;

  function handleStatusChange() {
    if (!navigator.onLine) {
      buildCube(cubeContainer, false);
      overlay.classList.add('show');
    } else {
      overlay.classList.remove('show');
    }
  }
  window.addEventListener('online', handleStatusChange);
  window.addEventListener('offline', handleStatusChange);
  handleStatusChange();
}

/*- UPDATE 4 & 5: DYNAMIC 3D CUBE RESOLUTION PIPELINE -*/
const PACKAGE_DETAILS = {
  starter: {
    title: "Starter Package Includes:",
    desc: "Up to 2 beautifully custom-crafted sections. Includes absolute production performance layouts, deep integration patterns for local contact discovery routes, active touch layouts, and native Google Maps anchoring hooks."
  },
  business: {
    title: "Business Package Includes:",
    desc: "Comprehensive multi-tier E-commerce system architecture setup. Complete digital inventory catalogue loops, custom automated payment gateways processing cross-border transactions, WhatsApp widgets, and high-conversion landing structures."
  }
};

function initPackageExplorer() {
  const modal = document.getElementById('package-modal');
  const cubeContainer = document.getElementById('modal-solving-cube');
  const targetDetails = document.getElementById('modal-details-target');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (!modal || !cubeContainer || !targetDetails) return;

  document.querySelectorAll('.learn-more-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPkg = btn.getAttribute('data-package');
      const infoPayload = PACKAGE_DETAILS[targetPkg];

      // Reset components view states
      targetDetails.classList.remove('reveal');
      targetDetails.innerHTML = '';
      cubeContainer.className = 'modal-solving-cube';
      
      // Step 5: Render scattered rubiks blocks state instantly inside expanded overlay window
      buildCube(cubeContainer, false);
      cubeContainer.classList.add('scattered', 'spinning');
      modal.classList.add('show');

      // Step 4: Halt axis tumble spin and solve cube sequence before showing information features list
      setTimeout(() => {
        cubeContainer.classList.remove('scattered', 'spinning');
        animateSolve(cubeContainer, () => {
          targetDetails.innerHTML = `
            <div class="package-explanation">
              <h3>${infoPayload.title}</h3>
              <p>${infoPayload.desc}</p>
            </div>
          `;
          targetDetails.classList.add('reveal');
        });
      }, 1400);
    });
  });

  closeBtn.addEventListener('click', () => { modal.classList.remove('show'); });
}

/*- DOM INITIALIZATION DISPATCHER -*/
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initOfflineDetection();
  initPackageExplorer();
});
