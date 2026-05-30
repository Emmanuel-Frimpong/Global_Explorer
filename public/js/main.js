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

  window.addEventListener('pageshow', hideLoading);
  window.addEventListener('load', hideLoading);

  window.GlobalExplorer = {
    showLoading,
    hideLoading,
  };
})();
