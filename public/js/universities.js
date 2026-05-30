(function () {
  const form = document.getElementById('universitySearchForm');
  const input = form?.querySelector('input[name="q"]');
  const grid = document.getElementById('universityGrid');

  if (!form || !input || !grid) return;

  let debounceTimer;

  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      const query = input.value.trim().toLowerCase();
      const cards = grid.querySelectorAll('.university-card');
      let visibleCount = 0;

      cards.forEach((card) => {
        const name = card.dataset.name || '';
        const matches = !query || name.includes(query);
        card.style.display = matches ? '' : 'none';
        if (matches) visibleCount += 1;
      });

      let noResults = grid.parentElement.querySelector('.university-no-results');

      if (visibleCount === 0 && query) {
        if (!noResults) {
          noResults = document.createElement('p');
          noResults.className = 'university-no-results alert alert--info';
          noResults.textContent = `No universities match "${input.value.trim()}" in this list. Press Search to query the API.`;
          grid.after(noResults);
        }
      } else if (noResults) {
        noResults.remove();
      }
    }, 200);
  });

  form.addEventListener('submit', () => {
    if (window.GlobalExplorer?.showLoading) {
      window.GlobalExplorer.showLoading();
    }
  });
})();
