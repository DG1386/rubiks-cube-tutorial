/**
 * Interactive 3D Rubik's Cube using CSS transforms
 * Supports multiple instances with custom colors and preset angles
 */

const Cube3D = {
  colorMap: {
    red:    '#e74c3c',
    orange: '#e67e22',
    blue:   '#2e86de',
    green:  '#10ac84',
    white:  '#ffffff',
    yellow: '#ffd32a',
    gray:   '#444a5a'
  },

  /** Solved cube colors (used for intro page) */
  solvedColors: {
    front:  ['red','red','red','red','red','red','red','red','red'],
    back:   ['orange','orange','orange','orange','orange','orange','orange','orange','orange'],
    right:  ['blue','blue','blue','blue','blue','blue','blue','blue','blue'],
    left:   ['green','green','green','green','green','green','green','green','green'],
    top:    ['white','white','white','white','white','white','white','white','white'],
    bottom: ['yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow','yellow']
  },

  /**
   * Create the intro page cube (solved, auto-rotating)
   */
  create(containerId) {
    return this.createCube(containerId, {
      colors: this.solvedColors,
      rotX: -25,
      rotY: -30,
      autoRotate: true,
      draggable: true,
      size: 150
    });
  },

  /**
   * Create a 3D cube with custom options
   * @param {string} containerId - DOM element id to render into
   * @param {object} opts
   * @param {object} opts.colors - { front, back, right, left, top, bottom } each 9-element array
   * @param {number} opts.rotX - initial X rotation degrees
   * @param {number} opts.rotY - initial Y rotation degrees
   * @param {boolean} opts.autoRotate - spin automatically
   * @param {boolean} opts.draggable - allow click-drag
   * @param {number} opts.size - cube size in px (default 150)
   */
  createCube(containerId, opts) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const size = opts.size || 150;
    const half = size / 2;
    const colors = opts.colors || this.solvedColors;

    // Instance state
    const inst = {
      rotX: opts.rotX != null ? opts.rotX : -25,
      rotY: opts.rotY != null ? opts.rotY : -30,
      isDragging: false,
      lastX: 0,
      lastY: 0,
      autoRotateId: null,
      cubeEl: null,
      size: size
    };

    container.innerHTML = '';
    container.style.perspective = '600px';
    container.style.cursor = opts.draggable ? 'grab' : 'default';

    const cubeEl = document.createElement('div');
    cubeEl.classList.add('cube-3d');
    cubeEl.style.width = size + 'px';
    cubeEl.style.height = size + 'px';
    cubeEl.style.margin = (size / 6) + 'px auto';
    inst.cubeEl = cubeEl;

    const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
    const transforms = {
      front:  `rotateY(0deg) translateZ(${half}px)`,
      back:   `rotateY(180deg) translateZ(${half}px)`,
      right:  `rotateY(90deg) translateZ(${half}px)`,
      left:   `rotateY(-90deg) translateZ(${half}px)`,
      top:    `rotateX(90deg) translateZ(${half}px)`,
      bottom: `rotateX(-90deg) translateZ(${half}px)`
    };

    faces.forEach(face => {
      const faceEl = document.createElement('div');
      faceEl.classList.add('cube-3d-face', face);
      faceEl.style.width = size + 'px';
      faceEl.style.height = size + 'px';
      faceEl.style.transform = transforms[face];

      (colors[face] || []).forEach(color => {
        const cell = document.createElement('div');
        cell.classList.add('cube-3d-cell');
        cell.style.background = this.colorMap[color] || this.colorMap.gray;
        faceEl.appendChild(cell);
      });

      cubeEl.appendChild(faceEl);
    });

    container.appendChild(cubeEl);

    // Set initial transform
    const updateTransform = () => {
      cubeEl.style.transform = `translateZ(-${half}px) rotateX(${inst.rotX}deg) rotateY(${inst.rotY}deg)`;
    };
    updateTransform();

    // Drag to rotate
    if (opts.draggable) {
      const onStart = (x, y) => {
        inst.isDragging = true;
        inst.lastX = x;
        inst.lastY = y;
        container.style.cursor = 'grabbing';
        if (inst.autoRotateId) {
          clearInterval(inst.autoRotateId);
          inst.autoRotateId = null;
        }
      };
      const onMove = (x, y) => {
        if (!inst.isDragging) return;
        inst.rotY += (x - inst.lastX) * 0.6;
        inst.rotX -= (y - inst.lastY) * 0.6;
        inst.rotX = Math.max(-90, Math.min(90, inst.rotX));
        inst.lastX = x;
        inst.lastY = y;
        updateTransform();
      };
      const onEnd = () => {
        inst.isDragging = false;
        container.style.cursor = 'grab';
      };

      container.addEventListener('mousedown', e => { e.preventDefault(); onStart(e.clientX, e.clientY); });
      document.addEventListener('mousemove', e => { if (inst.isDragging) onMove(e.clientX, e.clientY); });
      document.addEventListener('mouseup', () => { if (inst.isDragging) onEnd(); });
      container.addEventListener('touchstart', e => { onStart(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
      document.addEventListener('touchmove', e => { if (inst.isDragging) onMove(e.touches[0].clientX, e.touches[0].clientY); }, { passive: true });
      document.addEventListener('touchend', () => { if (inst.isDragging) onEnd(); });
    }

    // Auto-rotate
    if (opts.autoRotate) {
      inst.autoRotateId = setInterval(() => {
        inst.rotY += 0.3;
        updateTransform();
      }, 30);
    }

    return inst;
  }
};
