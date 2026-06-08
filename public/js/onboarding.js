(function () {
  const ONBOARDING_COMPLETED_KEY = 'onboardingCompleted';
  const ONBOARDING_VERSION_KEY = 'onboardingVersion';
  const CURRENT_VERSION = '1.0';

  let currentStepIndex = 0;
  let activeHighlightElement = null;

  const tourSteps = [
    {
      title: 'Search any Country',
      message: 'Search any country to discover information, universities, holidays, and more.',
      selector: '#searchForm',
      fallbackSelector: '.search-section--hero'
    },
    {
      title: 'Favorites Menu',
      message: 'Save countries to your Favorites for quick access later.',
      selector: 'a[href="/favorites"]'
    },
    {
      title: 'Universities Feature',
      message: 'Explore universities and educational institutions around the world.',
      selector: '.features-grid article:nth-child(2)', // Home page Universities card
      fallbackSelector: 'a[href*="/universities"]' // Country page tab
    },
    {
      title: 'Currency Converter',
      message: 'Compare currencies and exchange rates quickly.',
      selector: '.features-grid article:nth-child(4)', // Home page Currency card
      fallbackSelector: 'a[href*="/currency"]' // Country page tab
    },
    {
      title: 'Dark Mode Toggle',
      message: 'Switch between light and dark themes anytime.',
      selector: '#themeToggle'
    }
  ];

  // Initialize Onboarding
  function init() {
    setupReplayTriggers();

    const completed = localStorage.getItem(ONBOARDING_COMPLETED_KEY) === 'true';
    const version = localStorage.getItem(ONBOARDING_VERSION_KEY);

    if (!completed || version !== CURRENT_VERSION) {
      showWelcomeModal();
    }
  }

  // Render Welcome Modal
  function showWelcomeModal() {
    cleanupOnboardingUI();

    const overlay = createOverlay();
    document.body.appendChild(overlay);

    const modal = document.createElement('div');
    modal.className = 'onboarding-modal';
    modal.id = 'onboardingWelcomeModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'onboardingWelcomeTitle');

    modal.innerHTML = `
      <div class="onboarding-header-graphic" aria-hidden="true">🌏</div>
      <div class="onboarding-body">
        <h2 class="onboarding-title" id="onboardingWelcomeTitle">Welcome to Global Explorer Dashboard</h2>
        <p class="onboarding-text">
          Explore countries, universities, public holidays, currencies, and destinations from around the world.
        </p>
        <div class="onboarding-actions onboarding-actions--modal">
          <button type="button" class="btn btn--outline" id="skipOnboardingBtn">Skip for Now</button>
          <button type="button" class="btn btn--primary" id="startOnboardingBtn">Take a Tour</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Fade-in animation triggers
    setTimeout(() => {
      overlay.classList.add('is-active');
      modal.classList.add('is-active');
      // Set focus to primary button
      document.getElementById('startOnboardingBtn').focus();
    }, 50);

    // Event listeners
    document.getElementById('skipOnboardingBtn').addEventListener('click', () => {
      completeOnboarding();
      closeOnboarding();
    });

    document.getElementById('startOnboardingBtn').addEventListener('click', () => {
      startGuidedTour();
    });

    // Keyboard navigation handlers
    modal.addEventListener('keydown', (e) => handleTabTrap(e, modal));
    document.addEventListener('keydown', handleEscapeKey);
  }

  // Guided Tour sequence
  function startGuidedTour() {
    currentStepIndex = 0;
    const modal = document.getElementById('onboardingWelcomeModal');
    if (modal) {
      modal.classList.remove('is-active');
      setTimeout(() => modal.remove(), 300);
    }
    showTourStep(currentStepIndex);
  }

  // Show a tour step tooltip
  function showTourStep(index) {
    cleanupHighlights();
    removeTooltipElement();

    const step = tourSteps[index];
    if (!step) {
      showCompletionScreen();
      return;
    }

    // Try primary selector, then fallback selector
    let target = document.querySelector(step.selector);
    if (!target && step.fallbackSelector) {
      target = document.querySelector(step.fallbackSelector);
    }

    const tooltip = document.createElement('div');
    tooltip.className = 'onboarding-tooltip';
    tooltip.id = 'onboardingTooltip';
    tooltip.setAttribute('role', 'dialog');
    tooltip.setAttribute('aria-modal', 'true');
    tooltip.setAttribute('aria-labelledby', 'onboardingTooltipTitle');

    // Arrow indicator
    const arrow = document.createElement('div');
    arrow.className = 'onboarding-tooltip-arrow';
    tooltip.appendChild(arrow);

    const isFirst = index === 0;
    const nextBtnText = index === tourSteps.length - 1 ? 'Finish' : 'Next';

    tooltip.innerHTML += `
      <div class="onboarding-body">
        <h3 class="onboarding-title" id="onboardingTooltipTitle">${step.title}</h3>
        <p class="onboarding-text">${step.message}</p>
        <div class="onboarding-actions">
          <button type="button" class="btn btn--outline btn--sm" id="tourSkipBtn">Skip</button>
          <button type="button" class="btn btn--primary btn--sm" id="tourNextBtn">${nextBtnText}</button>
        </div>
        <div class="onboarding-steps-indicator">
          <span>Step ${index + 1} of ${tourSteps.length}</span>
        </div>
      </div>
    `;

    document.body.appendChild(tooltip);

    // Apply overlay highlight to target
    if (target) {
      target.classList.add('onboarding-target-highlight');
      activeHighlightElement = target;
      
      // Auto-scroll target into view if out of viewport, excluding small screens to prevent visual shifts
      if (window.innerWidth > 768) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Position tooltip
    positionTooltip(target, tooltip);

    setTimeout(() => {
      tooltip.classList.add('is-active');
      document.getElementById('tourNextBtn').focus();
    }, 50);

    // Button event listeners
    document.getElementById('tourSkipBtn').addEventListener('click', () => {
      completeOnboarding();
      closeOnboarding();
    });

    document.getElementById('tourNextBtn').addEventListener('click', () => {
      currentStepIndex++;
      showTourStep(currentStepIndex);
    });

    // Resize/Scroll triggers to keep positions correct
    window.addEventListener('resize', repositionActiveTooltip);
    window.addEventListener('scroll', repositionActiveTooltip);

    // Focus & Key traps
    tooltip.addEventListener('keydown', (e) => handleTabTrap(e, tooltip));
  }

  // Show Tour Completion screen
  function showCompletionScreen() {
    cleanupHighlights();
    removeTooltipElement();

    const tooltip = document.createElement('div');
    tooltip.className = 'onboarding-tooltip onboarding-tooltip--centered';
    tooltip.id = 'onboardingTooltip';
    tooltip.setAttribute('role', 'dialog');
    tooltip.setAttribute('aria-modal', 'true');
    tooltip.setAttribute('aria-labelledby', 'onboardingTooltipTitle');

    tooltip.innerHTML = `
      <div class="onboarding-body" style="text-align: center;">
        <h3 class="onboarding-title" id="onboardingTooltipTitle" style="font-size:1.35rem;">🎉 You're all set!</h3>
        <p class="onboarding-text">Start exploring the world and discovering universities, currencies, and public holidays.</p>
        <button type="button" class="btn btn--primary" id="tourFinishBtn" style="width: 100%;">Start Exploring</button>
      </div>
    `;

    document.body.appendChild(tooltip);

    setTimeout(() => {
      tooltip.classList.add('is-active');
      document.getElementById('tourFinishBtn').focus();
    }, 50);

    document.getElementById('tourFinishBtn').addEventListener('click', () => {
      completeOnboarding();
      closeOnboarding();
    });

    tooltip.addEventListener('keydown', (e) => handleTabTrap(e, tooltip));
  }

  // Position dynamic tooltip relative to target rect
  function positionTooltip(target, tooltip) {
    if (!target) {
      tooltip.classList.add('onboarding-tooltip--centered');
      return;
    }

    tooltip.classList.remove('onboarding-tooltip--centered');
    const rect = target.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const tooltipHeight = tooltip.offsetHeight || 160;
    const tooltipWidth = tooltip.offsetWidth || 300;
    const viewportHeight = window.innerHeight;
    const spaceBottom = viewportHeight - rect.bottom;

    let top = rect.bottom + scrollTop + 12;
    tooltip.classList.add('onboarding-tooltip--bottom');
    tooltip.classList.remove('onboarding-tooltip--top');

    // Place tooltip on top if viewport space below is insufficient
    if (spaceBottom < tooltipHeight + 24 && rect.top > tooltipHeight + 24) {
      top = rect.top + scrollTop - tooltipHeight - 12;
      tooltip.classList.add('onboarding-tooltip--top');
      tooltip.classList.remove('onboarding-tooltip--bottom');
    }

    let left = rect.left + scrollLeft + (rect.width - tooltipWidth) / 2;

    // Boundary constraints
    const pad = 16;
    if (left < pad) left = pad;
    if (left + tooltipWidth > window.innerWidth - pad) {
      left = window.innerWidth - tooltipWidth - pad;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  function repositionActiveTooltip() {
    const tooltip = document.getElementById('onboardingTooltip');
    if (!tooltip) return;

    const step = tourSteps[currentStepIndex];
    if (!step) return;

    let target = document.querySelector(step.selector);
    if (!target && step.fallbackSelector) {
      target = document.querySelector(step.fallbackSelector);
    }

    positionTooltip(target, tooltip);
  }

  // Set local storage keys
  function completeOnboarding() {
    try {
      localStorage.setItem(ONBOARDING_COMPLETED_KEY, 'true');
      localStorage.setItem(ONBOARDING_VERSION_KEY, CURRENT_VERSION);
    } catch (e) {
      /* localStorage blocked or full */
    }
  }

  // Complete cleanup and overlay remove
  function closeOnboarding() {
    cleanupHighlights();
    cleanupOnboardingUI();
  }

  function createOverlay() {
    let overlay = document.getElementById('onboardingOverlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'onboarding-overlay';
      overlay.id = 'onboardingOverlay';
    }
    return overlay;
  }

  function cleanupOnboardingUI() {
    const welcome = document.getElementById('onboardingWelcomeModal');
    if (welcome) welcome.remove();

    const tooltip = document.getElementById('onboardingTooltip');
    if (tooltip) tooltip.remove();

    const overlay = document.getElementById('onboardingOverlay');
    if (overlay) {
      overlay.classList.remove('is-active');
      setTimeout(() => overlay.remove(), 300);
    }

    window.removeEventListener('resize', repositionActiveTooltip);
    window.removeEventListener('scroll', repositionActiveTooltip);
    document.removeEventListener('keydown', handleEscapeKey);
  }

  function cleanupHighlights() {
    if (activeHighlightElement) {
      activeHighlightElement.classList.remove('onboarding-target-highlight');
      activeHighlightElement = null;
    }
    document.querySelectorAll('.onboarding-target-highlight').forEach((el) => {
      el.classList.remove('onboarding-target-highlight');
    });
  }

  function removeTooltipElement() {
    const tooltip = document.getElementById('onboardingTooltip');
    if (tooltip) tooltip.remove();
  }

  // Replay tour button triggers
  function setupReplayTriggers() {
    const startBtn = document.getElementById('startOnboardingTour');
    if (startBtn) {
      startBtn.addEventListener('click', (e) => {
        e.preventDefault();
        cleanupOnboardingUI();
        cleanupHighlights();

        const overlay = createOverlay();
        document.body.appendChild(overlay);
        
        setTimeout(() => {
          overlay.classList.add('is-active');
          document.addEventListener('keydown', handleEscapeKey);
          startGuidedTour();
        }, 50);
      });
    }
  }

  // Accessibility: TAB focus trapping
  function handleTabTrap(e, container) {
    if (e.key !== 'Tab') return;

    const focusableSelector = 'button, [href], input, select, textarea, [tabindex="0"]';
    const focusables = container.querySelectorAll(focusableSelector);
    if (focusables.length === 0) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        last.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === last) {
        first.focus();
        e.preventDefault();
      }
    }
  }

  // Accessibility: Dismiss via ESC key
  function handleEscapeKey(e) {
    if (e.key === 'Escape') {
      closeOnboarding();
    }
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
