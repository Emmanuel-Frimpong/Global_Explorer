(function () {
  const HISTORY_KEY = 'ge_search_history';
  const RECENTLY_VIEWED_KEY = 'ge_recently_viewed';
  const MAX_ENTRIES = 10;
  const MAX_RECENT = 5;

  function saveToHistory(countryName) {
    if (!countryName) return;

    try {
      const history = JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
      const filtered = history.filter(
        (entry) => entry.query.toLowerCase() !== countryName.toLowerCase()
      );

      filtered.unshift({
        query: countryName,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(filtered.slice(0, MAX_ENTRIES))
      );
    } catch {
      /* localStorage unavailable */
    }
  }

  function saveToRecentlyViewed(country) {
    if (!country || !country.slug) return;

    try {
      const list = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY)) || [];
      const filtered = list.filter(
        (item) => item.slug.toLowerCase() !== country.slug.toLowerCase()
      );

      filtered.unshift({
        ...country,
        timestamp: new Date().toISOString()
      });

      localStorage.setItem(
        RECENTLY_VIEWED_KEY,
        JSON.stringify(filtered.slice(0, MAX_RECENT))
      );
    } catch {
      /* localStorage unavailable */
    }
  }

  // Get country data from banner or standard headers
  const countryNameEl = document.querySelector('.country-banner__title') || document.querySelector('.country-header__info h1');
  const favBtn = document.querySelector('[data-favorite-btn]');

  if (countryNameEl) {
    const rawName = countryNameEl.textContent.trim();
    saveToHistory(rawName);
  }

  if (favBtn) {
    saveToRecentlyViewed({
      name: favBtn.dataset.name,
      slug: favBtn.dataset.slug,
      flag: favBtn.dataset.flag,
      region: favBtn.dataset.region,
      capital: favBtn.dataset.capital
    });
  }
})();
