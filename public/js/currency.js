(function () {
  const HISTORY_KEY = 'ge_conversion_history';
  const MAX_ENTRIES = 10;

  const baseSelect = document.getElementById('base');
  const targetSelect = document.getElementById('target');
  const swapBtn = document.getElementById('swapCurrencies');
  const form = document.getElementById('converterForm');
  const historyList = document.getElementById('conversionHistoryList');
  const historyEmpty = document.getElementById('conversionHistoryEmpty');
  const clearBtn = document.getElementById('clearConversionHistory');

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveToHistory(entry) {
    try {
      const history = getHistory();
      const key = `${entry.amount}-${entry.base}-${entry.target}`;
      const filtered = history.filter(
        (item) => `${item.amount}-${item.base}-${item.target}` !== key
      );

      filtered.unshift({
        ...entry,
        timestamp: new Date().toISOString(),
      });

      localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, MAX_ENTRIES)));
      renderHistory();
    } catch {
      /* localStorage unavailable */
    }
  }

  function formatTime(iso) {
    return new Date(iso).toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function renderHistory() {
    const history = getHistory();

    if (!history.length) {
      historyEmpty.style.display = '';
      historyList.innerHTML = '';
      clearBtn.style.display = 'none';
      return;
    }

    historyEmpty.style.display = 'none';
    clearBtn.style.display = '';

    historyList.innerHTML = history
      .map(
        (entry) => `
        <li class="conversion-history__item">
          <div>
            <p class="conversion-history__pair">${entry.amount} ${entry.base} → ${entry.target}</p>
            <p class="conversion-history__result">${entry.formattedConverted}</p>
            <p class="conversion-history__rate">Rate: 1 ${entry.base} = ${Number(entry.rate).toFixed(4)} ${entry.target}</p>
            <p class="conversion-history__time">${formatTime(entry.timestamp)}</p>
          </div>
        </li>
      `
      )
      .join('');
  }

  if (swapBtn && baseSelect && targetSelect) {
    swapBtn.addEventListener('click', () => {
      const temp = baseSelect.value;
      baseSelect.value = targetSelect.value;
      targetSelect.value = temp;
    });
  }

  if (form) {
    form.addEventListener('submit', () => {
      if (window.GlobalExplorer?.showLoading) {
        window.GlobalExplorer.showLoading();
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      localStorage.removeItem(HISTORY_KEY);
      renderHistory();
    });
  }

  if (window.__conversionResult) {
    saveToHistory(window.__conversionResult);
  }

  renderHistory();
})();
