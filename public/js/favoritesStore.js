(function () {
  const FAVORITES_KEY = 'ge_favorites';

  function normalizeEntry(entry) {
    if (typeof entry === 'string') {
      return {
        name: entry,
        slug: entry.toLowerCase(),
        flag: '',
        region: '',
        capital: '',
        addedAt: new Date().toISOString(),
      };
    }

    return {
      name: entry.name,
      slug: entry.slug || entry.name.toLowerCase(),
      flag: entry.flag || '',
      region: entry.region || '',
      capital: entry.capital || '',
      addedAt: entry.addedAt || new Date().toISOString(),
    };
  }

  function getAll() {
    try {
      const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
      return stored.map(normalizeEntry);
    } catch {
      return [];
    }
  }

  function save(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    document.dispatchEvent(new CustomEvent('favoritesChanged', { detail: favorites }));
  }

  function isFavorite(slug) {
    const key = slug.toLowerCase();
    return getAll().some((item) => item.slug === key);
  }

  function add(country) {
    const entry = normalizeEntry(country);

    if (isFavorite(entry.slug)) {
      return getAll();
    }

    const favorites = getAll();
    favorites.unshift({ ...entry, addedAt: new Date().toISOString() });
    save(favorites);
    return favorites;
  }

  function remove(slug) {
    const key = slug.toLowerCase();
    const favorites = getAll().filter((item) => item.slug !== key);
    save(favorites);
    return favorites;
  }

  function toggle(country) {
    const entry = normalizeEntry(country);
    return isFavorite(entry.slug) ? remove(entry.slug) : add(entry);
  }

  function count() {
    return getAll().length;
  }

  function updateBadge() {
    const badge = document.getElementById('favoritesBadge');
    if (!badge) return;

    const total = count();
    badge.textContent = total;
    badge.hidden = total === 0;
  }

  function updateButton(button) {
    if (!button) return;

    const slug = button.dataset.slug;
    const active = isFavorite(slug);

    button.classList.toggle('favorite-btn--active', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');

    const icon = button.querySelector('.favorite-btn__icon');
    const text = button.querySelector('.favorite-btn__text');

    if (icon) icon.textContent = active ? '\u2605' : '\u2606';
    if (text) text.textContent = active ? 'Saved to Favorites' : 'Add to Favorites';
  }

  function initButton(button) {
    if (!button || button.dataset.favoriteInit) return;

    button.dataset.favoriteInit = 'true';
    updateButton(button);

    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();

      toggle({
        name: button.dataset.name,
        slug: button.dataset.slug,
        flag: button.dataset.flag,
        region: button.dataset.region,
        capital: button.dataset.capital,
      });

      updateButton(button);
    });
  }

  function initAllButtons() {
    document.querySelectorAll('[data-favorite-btn]').forEach(initButton);
    updateBadge();
  }

  document.addEventListener('favoritesChanged', () => {
    document.querySelectorAll('[data-favorite-btn]').forEach(updateButton);
    updateBadge();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllButtons);
  } else {
    initAllButtons();
  }

  window.FavoritesStore = {
    getAll,
    add,
    remove,
    toggle,
    isFavorite,
    count,
    initButton,
    initAllButtons,
    updateBadge,
  };
})();
