(function () {
  const HISTORY_KEY = 'ge_search_history';
  const MAX_ENTRIES = 10;
  const emptyEl = document.getElementById('historyEmpty');
  const listEl = document.getElementById('historyList');
  const clearBtn = document.getElementById('clearHistoryBtn');

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  }

  function formatTime(iso) {
    const date = new Date(iso);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function renderHistory() {
    const history = getHistory();

    if (!history.length) {
      emptyEl.style.display = '';
      listEl.style.display = 'none';
      clearBtn.style.display = 'none';
      return;
    }

    emptyEl.style.display = 'none';
    listEl.style.display = '';
    clearBtn.style.display = '';

    listEl.innerHTML = history
      .map(
        (entry) => `
        <div class="history-item">
          <div>
            <p class="history-item__query">${entry.query}</p>
            <p class="history-item__time">${formatTime(entry.timestamp)}</p>
          </div>
          <a href="/country/${encodeURIComponent(entry.query.toLowerCase())}" class="btn btn--sm btn--outline">View</a>
        </div>
      `
      )
      .join('');
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem(HISTORY_KEY);
      renderHistory();
    });
  }

  renderHistory();
})();
