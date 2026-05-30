(function () {
  const emptyEl = document.getElementById('favoritesEmpty');
  const gridEl = document.getElementById('favoritesGrid');
  const countEl = document.getElementById('favoritesCount');
  const clearBtn = document.getElementById('clearFavoritesBtn');

  if (!emptyEl || !gridEl || !window.FavoritesStore) return;

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function renderFavorites() {
    const favorites = FavoritesStore.getAll();

    if (countEl) {
      countEl.textContent = `${favorites.length} saved`;
    }

    if (clearBtn) {
      clearBtn.style.display = favorites.length ? '' : 'none';
    }

    if (!favorites.length) {
      emptyEl.style.display = '';
      gridEl.style.display = 'none';
      gridEl.innerHTML = '';
      return;
    }

    emptyEl.style.display = 'none';
    gridEl.style.display = '';

    gridEl.innerHTML = favorites
      .map(
        (country) => `
        <article class="favorite-card">
          ${
            country.flag
              ? `<img src="${escapeHtml(country.flag)}" alt="Flag of ${escapeHtml(country.name)}" class="favorite-card__flag" loading="lazy">`
              : '<div class="favorite-card__flag favorite-card__flag--placeholder">&#127758;</div>'
          }
          <div class="favorite-card__body">
            <h2 class="favorite-card__name">${escapeHtml(country.name)}</h2>
            <p class="favorite-card__meta">${escapeHtml(country.region)}${country.capital ? ` &middot; ${escapeHtml(country.capital)}` : ''}</p>
          </div>
          <div class="favorite-card__actions">
            <a href="/country/${encodeURIComponent(country.slug)}" class="btn btn--sm">View Country</a>
            <button
              type="button"
              class="btn btn--sm btn--danger favorite-card__remove"
              data-remove-slug="${escapeHtml(country.slug)}"
              aria-label="Remove ${escapeHtml(country.name)} from favorites"
            >
              Remove
            </button>
          </div>
        </article>
      `
      )
      .join('');

    gridEl.querySelectorAll('.favorite-card__remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        FavoritesStore.remove(btn.dataset.removeSlug);
        renderFavorites();
      });
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem('ge_favorites');
      document.dispatchEvent(new CustomEvent('favoritesChanged', { detail: [] }));
      renderFavorites();
    });
  }

  document.addEventListener('favoritesChanged', renderFavorites);
  renderFavorites();
})();
