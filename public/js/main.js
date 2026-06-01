(function () {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const loadingOverlay = document.getElementById('loadingOverlay');
  const searchForm = document.getElementById('searchForm');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
  }

  function showLoading() {
    if (loadingOverlay) {
      loadingOverlay.classList.add('is-visible');
      loadingOverlay.setAttribute('aria-hidden', 'false');
    }
  }

  function hideLoading() {
    if (loadingOverlay) {
      loadingOverlay.classList.remove('is-visible');
      loadingOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  if (searchForm) {
    searchForm.addEventListener('submit', () => {
      showLoading();
    });
  }

  document.querySelectorAll('a[href^="/country"]').forEach((link) => {
    link.addEventListener('click', () => {
      showLoading();
    });
  });

  // Client side recently viewed renderer (Phase 6)
  function renderRecentlyViewed() {
    const container = document.getElementById('recentlyViewedContainer');
    const grid = document.getElementById('recentlyViewedGrid');
    if (!container || !grid) return;

    try {
      const list = JSON.parse(localStorage.getItem('ge_recently_viewed')) || [];
      if (list.length === 0) {
        container.style.display = 'none';
        return;
      }

      container.style.display = 'block';
      grid.innerHTML = list
        .map(
          (item) => `
          <a href="/country/${encodeURIComponent(item.slug)}" class="recent-country-card">
            ${
              item.flag
                ? `<img src="${item.flag}" alt="" class="recent-country-card__flag" loading="lazy">`
                : `<div class="recent-country-card__flag" style="display:flex;align-items:center;justify-content:center;background:rgba(37,99,235,0.08);font-size:1.125rem;">🌍</div>`
            }
            <div class="recent-country-card__info">
              <h3 class="recent-country-card__name">${item.name}</h3>
              <p class="recent-country-card__region">${item.region || 'Explore'}</p>
            </div>
          </a>
        `
        )
        .join('');
    } catch (e) {
      container.style.display = 'none';
    }
  }

  // Count-Up Statistics Animation (Phase 5)
  function animateCounters() {
    const counters = document.querySelectorAll('.data-counter');
    counters.forEach((counter) => {
      const targetStr = counter.dataset.countValue || counter.textContent;
      const targetVal = parseInt(targetStr.replace(/[^0-9]/g, ''), 10);
      if (isNaN(targetVal)) return;

      let startVal = 0;
      const duration = 1200; // ms
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing out quadratic
        const easeProgress = progress * (2 - progress);
        const currentVal = Math.floor(easeProgress * targetVal);

        counter.textContent = currentVal.toLocaleString('en-US');

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = targetVal.toLocaleString('en-US');
        }
      }

      // Check if element is in viewport before animating
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            requestAnimationFrame(update);
            observer.unobserve(counter);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(counter);
    });
  }

  // Trigger page visual tasks
  function initVisualTasks() {
    renderRecentlyViewed();
    animateCounters();
    hideLoading();
  }

  window.addEventListener('pageshow', hideLoading);
  window.addEventListener('load', initVisualTasks);
  
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initVisualTasks();
  } else {
    document.addEventListener('DOMContentLoaded', initVisualTasks);
  }

  window.GlobalExplorer = {
    showLoading,
    hideLoading,
    renderRecentlyViewed,
  };
})();
