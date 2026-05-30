(function () {
  const HISTORY_KEY = 'ge_search_history';
  const MAX_ENTRIES = 10;

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

  const countryName = document.querySelector('.country-header__info h1');
  if (countryName) {
    saveToHistory(countryName.textContent.trim());
  }
})();
