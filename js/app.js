/**
 * Main Application Controller
 * Handles navigation, rendering, progress tracking, theme toggle, and i18n
 */

(function () {
  'use strict';

  // ========================================
  // State
  // ========================================
  let currentStep = 'intro';
  let progress = {};
  let currentLang = 'en'; // 'en' or 'he'

  const STEP_ORDER = ['step1','step2','step3','step4','step5','step6','step7','step8'];

  // ========================================
  // DOM References
  // ========================================
  const mainContent = document.getElementById('mainContent');
  const navList = document.getElementById('navList');
  const progressFill = document.getElementById('progressFill');
  const progressText = document.getElementById('progressText');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const menuToggle = document.getElementById('menuToggle');
  const themeToggle = document.getElementById('themeToggle');
  const themeToggleMobile = document.getElementById('themeToggleMobile');
  const langToggle = document.getElementById('langToggle');
  const langToggleMobile = document.getElementById('langToggleMobile');

  // ========================================
  // i18n Helpers
  // ========================================
  function t() {
    return LANG[currentLang];
  }

  function getSteps() {
    return currentLang === 'he' ? STEPS_HE : STEPS;
  }

  function getCheatsheet() {
    return currentLang === 'he' ? CHEATSHEET_HE : CHEATSHEET;
  }

  function getNotation() {
    return currentLang === 'he' ? NOTATION_HE : NOTATION;
  }

  // ========================================
  // Language
  // ========================================
  function initLang() {
    const saved = localStorage.getItem('cube-lang') || 'en';
    setLang(saved, false);
  }

  function setLang(lang, rerender) {
    currentLang = lang;
    localStorage.setItem('cube-lang', lang);

    // Set RTL direction
    if (lang === 'he') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'he');
    } else {
      document.documentElement.removeAttribute('dir');
      document.documentElement.setAttribute('lang', 'en');
    }

    // Update toggle button labels — show the OTHER language
    const label = lang === 'he' ? 'EN' : 'עב';
    document.querySelectorAll('.lang-label').forEach(el => el.textContent = label);

    // Update sidebar static elements
    document.querySelector('.logo').textContent = '🧊 ' + t().appTitle;
    document.querySelector('.mobile-title').textContent = t().mobileTitle;
    document.querySelector('.sidebar-footer p').innerHTML =
      t().footerText + '<br><a href="https://easiestsolve.com/videos/" target="_blank" rel="noopener">EasiestSolve.com</a>';

    // Update nav labels
    updateNavLabels();
    updateProgressUI();

    if (rerender) {
      navigateTo(currentStep);
    }
  }

  function toggleLang() {
    setLang(currentLang === 'en' ? 'he' : 'en', true);
  }

  function updateNavLabels() {
    const labels = t().navLabels;
    // Update the step nav labels
    document.querySelectorAll('.nav-item').forEach(item => {
      const step = item.dataset.step;
      const labelEl = item.querySelector('.nav-label');
      if (!labelEl) return;

      if (step === 'intro') {
        labelEl.textContent = t().welcome;
      } else if (step === 'cheatsheet') {
        labelEl.textContent = t().cheatSheet;
      } else if (labels[step]) {
        labelEl.textContent = labels[step];
      }
    });
  }

  langToggle.addEventListener('click', toggleLang);
  langToggleMobile.addEventListener('click', toggleLang);

  // ========================================
  // Theme
  // ========================================
  function initTheme() {
    const saved = localStorage.getItem('cube-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    updateThemeIcon(saved);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cube-theme', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    const icon = theme === 'dark' ? '🌙' : '☀️';
    document.querySelectorAll('.theme-icon').forEach(el => el.textContent = icon);
  }

  themeToggle.addEventListener('click', toggleTheme);
  themeToggleMobile.addEventListener('click', toggleTheme);

  // ========================================
  // Mobile Menu
  // ========================================
  menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    sidebarOverlay.classList.toggle('visible');
  });

  sidebarOverlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
  });

  // ========================================
  // Progress Tracking
  // ========================================
  function loadProgress() {
    try {
      progress = JSON.parse(localStorage.getItem('cube-progress') || '{}');
    } catch { progress = {}; }
  }

  function saveProgress() {
    localStorage.setItem('cube-progress', JSON.stringify(progress));
  }

  function updateProgressUI() {
    const completed = STEP_ORDER.filter(s => progress[s]).length;
    const pct = (completed / STEP_ORDER.length) * 100;
    progressFill.style.width = pct + '%';
    progressText.textContent = t().stepsProgress(completed, STEP_ORDER.length);

    // Update check marks in nav
    document.querySelectorAll('.nav-check').forEach(el => {
      const step = el.dataset.check;
      el.classList.toggle('completed', !!progress[step]);
    });
  }

  function toggleStepComplete(stepId) {
    progress[stepId] = !progress[stepId];
    saveProgress();
    updateProgressUI();
    renderStep(stepId);
  }

  // ========================================
  // Navigation
  // ========================================
  function navigateTo(stepId) {
    currentStep = stepId;

    // Close mobile menu
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');

    // Update nav active state
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.step === stepId);
    });

    // Render content
    if (stepId === 'intro') {
      renderIntro();
    } else if (stepId === 'cheatsheet') {
      renderCheatsheet();
    } else {
      renderStep(stepId);
    }

    // Scroll to top
    mainContent.scrollTo(0, 0);
    window.scrollTo(0, 0);
  }

  // Attach nav click handlers
  navList.addEventListener('click', e => {
    const navItem = e.target.closest('.nav-item');
    if (navItem && navItem.dataset.step) {
      navigateTo(navItem.dataset.step);
    }
  });

  // ========================================
  // Render: Intro Page
  // ========================================
  function renderIntro() {
    const strings = t();
    const notation = getNotation();
    const steps = getSteps();
    const arrow = currentLang === 'he' ? '←' : '→';

    mainContent.innerHTML = `
      <div class="step-page">
        <div class="intro-hero">
          <div id="introCube"></div>
          <h1>${escHtml(strings.introHeading)}<br><span>${escHtml(strings.introHeadingAccent)}</span></h1>
          <p>${escHtml(strings.introDesc)}</p>
          <button class="start-btn" onclick="window._nav('step1')">
            ${escHtml(strings.startLearning)} ${arrow}
          </button>
        </div>

        <div class="notation-section">
          <h2>${escHtml(strings.notationGuide)}</h2>
          <p style="color:var(--text-secondary); margin-bottom:16px;">
            ${strings.notationDesc}
          </p>
          <div class="notation-grid">
            ${notation.map(n => `
              <div class="notation-card">
                <div class="notation-letter">${escHtml(n.letter)}</div>
                <div class="notation-desc">
                  <strong>${escHtml(n.name)}</strong>
                  ${escHtml(n.desc)}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="overview-section">
          <h2>${escHtml(strings.overviewTitle)}</h2>
          <div class="overview-grid">
            ${STEP_ORDER.map(id => {
              const s = steps[id];
              return `
                <div class="overview-card" onclick="window._nav('${id}')">
                  <div class="overview-num">${s.number}</div>
                  <div class="overview-info">
                    <h4>${escHtml(s.title)}</h4>
                    <p>${escHtml(s.subtitle)}</p>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    setTimeout(() => Cube3D.create('introCube'), 50);
  }

  // ========================================
  // Render: Tutorial Step
  // ========================================
  function renderStep(stepId) {
    const steps = getSteps();
    const step = steps[stepId];
    if (!step) return;

    const strings = t();
    const idx = STEP_ORDER.indexOf(stepId);
    const prevStep = idx > 0 ? STEP_ORDER[idx - 1] : 'intro';
    const nextStep = idx < STEP_ORDER.length - 1 ? STEP_ORDER[idx + 1] : null;
    const isCompleted = !!progress[stepId];
    const isRtl = currentLang === 'he';

    // Arrows flip for RTL
    const prevArrow = isRtl ? '→' : '←';
    const nextArrow = isRtl ? '←' : '→';
    const prevLabel = idx > 0 ? (isRtl ? 'שלב ' + idx : 'Step ' + idx) : strings.home;
    const nextLabel = nextStep
      ? (isRtl ? 'שלב ' + (idx + 2) : 'Step ' + (idx + 2))
      : strings.cheatSheet;

    mainContent.innerHTML = `
      <div class="step-page">
        <div class="step-header">
          <div class="step-number">${strings.stepOf(step.number)}</div>
          <h1 class="step-title">${escHtml(step.title)}</h1>
          <p class="step-subtitle">${escHtml(step.subtitle)}</p>
        </div>

        <!-- Goal -->
        <div class="goal-card">
          <span class="goal-icon">🎯</span>
          <div>
            <h3>${escHtml(strings.goal)}</h3>
            <p>${escHtml(step.goal)}</p>
          </div>
        </div>

        <!-- Algorithm -->
        ${renderAlgorithm(step, strings)}

        <!-- Diagram -->
        ${step.diagram ? renderDiagram(step.diagram, strings) : ''}

        <!-- Instructions -->
        <div class="instructions">
          <h2>${escHtml(strings.howToDoIt)}</h2>
          ${step.instructions.map((inst, i) => `
            <div class="instruction-step">
              <div class="instruction-num">${i + 1}</div>
              <div class="instruction-text">
                <h4>${escHtml(inst.title)}</h4>
                <p>${escHtml(inst.text)}</p>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Patterns (if any) -->
        ${step.patterns ? renderPatterns(step.patterns, strings) : ''}

        <!-- Tips -->
        <div class="tips-box">
          <h3>💡 ${escHtml(strings.tipsTitle)}</h3>
          <ul>
            ${step.tips.map(tip => `<li>${escHtml(tip)}</li>`).join('')}
          </ul>
        </div>

        <!-- Navigation -->
        <div class="step-nav">
          <button class="step-btn" onclick="window._nav('${prevStep}')">
            ${prevArrow} ${escHtml(prevLabel)}
          </button>
          <button class="complete-btn ${isCompleted ? 'is-completed' : ''}" onclick="window._toggleComplete('${stepId}')">
            ${isCompleted ? '✓ ' + escHtml(strings.completed) : escHtml(strings.markComplete)}
          </button>
          ${nextStep ? `
            <button class="step-btn primary" onclick="window._nav('${nextStep}')">
              ${escHtml(nextLabel)} ${nextArrow}
            </button>
          ` : `
            <button class="step-btn primary" onclick="window._nav('cheatsheet')">
              ${escHtml(strings.cheatSheet)} 📋
            </button>
          `}
        </div>
      </div>
    `;
  }

  function renderAlgorithm(step, strings) {
    if (step.algorithm) {
      let movesHtml = `<div class="algo-moves">${escHtml(step.algorithm.moves)}</div>`;
      if (step.algorithm.movesAlt) {
        movesHtml += `<div class="algo-moves" style="margin-top:8px;font-size:1.2rem;color:var(--text-secondary);">${currentLang === 'he' ? 'או' : 'or'}: ${escHtml(step.algorithm.movesAlt)}</div>`;
      }
      return `
        <div class="algo-box">
          <h3>${escHtml(strings.algorithm)}</h3>
          ${movesHtml}
          <div class="algo-mnemonic">${escHtml(step.algorithm.mnemonic)}</div>
        </div>
      `;
    }
    return `
      <div class="algo-box no-algo">
        <h3>${escHtml(strings.algorithm)}</h3>
        <div class="algo-moves">${escHtml(step.algoNote || (currentLang === 'he' ? 'אין צורך באלגוריתם לשלב זה.' : 'No algorithm needed for this step.'))}</div>
      </div>
    `;
  }

  function renderDiagram(diagram, strings) {
    if (diagram.label) {
      return `
        <div class="cube-diagram-container">
          <h2>${escHtml(strings.whatItLooksLike)}</h2>
          <div class="goal-card">
            <span class="goal-icon">👁️</span>
            <div><p>${escHtml(diagram.label)}</p></div>
          </div>
        </div>
      `;
    }

    const cellColorMap = {
      'W': 'cell-white',
      'Y': 'cell-yellow',
      'R': 'cell-red',
      'O': 'cell-orange',
      'B': 'cell-blue',
      'G': 'cell-gray'
    };

    const cells = diagram.cells.map(c =>
      `<div class="cube-cell ${cellColorMap[c] || 'cell-gray'}"></div>`
    ).join('');

    const faceLabel = diagram.face === 'top' ? strings.topFace : strings.bottomFace;

    return `
      <div class="cube-diagram-container">
        <h2>${escHtml(strings.whatItLooksLike)}</h2>
        <div class="cube-diagram">
          <div class="cube-face">${cells}</div>
          <div style="text-align:center;margin-top:10px;font-size:0.85rem;color:var(--text-muted);">${escHtml(faceLabel)}</div>
        </div>
      </div>
    `;
  }

  function renderPatterns(patterns, strings) {
    const cellColorMap = {
      'W': 'cell-white',
      'Y': 'cell-yellow',
      'R': 'cell-red',
      'O': 'cell-orange',
      'B': 'cell-blue',
      'G': 'cell-gray'
    };

    return `
      <div class="patterns-section">
        <h2>${escHtml(strings.patternRecognition)}</h2>
        <div class="patterns-grid">
          ${patterns.map(p => `
            <div class="pattern-card">
              <h4>${escHtml(p.name)}</h4>
              <div class="pattern-mini">
                ${p.cells.map(c =>
                  `<div class="cube-cell ${cellColorMap[c] || 'cell-gray'}"></div>`
                ).join('')}
              </div>
              <p>${escHtml(p.note)}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ========================================
  // Render: Cheat Sheet
  // ========================================
  function renderCheatsheet() {
    const strings = t();
    const cheatsheet = getCheatsheet();
    const isRtl = currentLang === 'he';
    const prevArrow = isRtl ? '→' : '←';

    mainContent.innerHTML = `
      <div class="step-page">
        <div class="step-header">
          <div class="step-number">${escHtml(strings.reference)}</div>
          <h1 class="step-title">${escHtml(strings.cheatSheet)}</h1>
          <p class="step-subtitle">${escHtml(strings.cheatSheetSubtitle)}</p>
        </div>

        <div class="cheatsheet-grid">
          ${cheatsheet.map(item => `
            <div class="cheatsheet-card" style="cursor:pointer" onclick="window._nav('step${item.step}')">
              <h3>
                <span style="color:var(--accent)">${isRtl ? 'שלב' : 'Step'} ${item.step}</span>
                ${escHtml(item.name)}
              </h3>
              <div class="algo-moves">${escHtml(item.algo)}</div>
              ${item.algoAlt ? `<div class="algo-moves" style="font-size:1rem;margin-top:4px;color:var(--text-muted)">${isRtl ? 'חלופי' : 'Alt'}: ${escHtml(item.algoAlt)}</div>` : ''}
              <p>${escHtml(item.desc)}</p>
            </div>
          `).join('')}
        </div>

        <div style="margin-top:32px; text-align:center;">
          <button class="step-btn" onclick="window.print()">
            🖨️ ${escHtml(strings.printCheatSheet)}
          </button>
        </div>

        <div class="step-nav">
          <button class="step-btn" onclick="window._nav('step8')">${prevArrow} ${isRtl ? 'שלב 8' : 'Step 8'}</button>
          <span></span>
          <button class="step-btn" onclick="window._nav('intro')">${escHtml(strings.home)} 🏠</button>
        </div>
      </div>
    `;
  }

  // ========================================
  // Utilities
  // ========================================
  function escHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Expose navigation for inline onclick handlers
  window._nav = navigateTo;
  window._toggleComplete = toggleStepComplete;

  // ========================================
  // Initialize
  // ========================================
  initTheme();
  initLang();
  loadProgress();
  updateProgressUI();
  navigateTo('intro');

})();
