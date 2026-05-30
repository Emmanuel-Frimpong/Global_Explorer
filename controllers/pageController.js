function getHome(req, res) {
  const errorType = req.query.error;
  const query = req.query.query || '';
  let alert = null;

  if (errorType === 'empty') {
    alert = { type: 'error', message: 'Please enter a country name to search.' };
  } else if (errorType === 'notfound') {
    alert = {
      type: 'error',
      message: `No countries found matching "${query}". Try a different spelling.`,
    };
  }

  res.render('index', {
    title: 'Home',
    activePage: 'home',
    alert,
    searchQuery: query,
  });
}

function getFavorites(req, res) {
  res.render('favorites', {
    title: 'Favorites',
    activePage: 'favorites',
  });
}

function getHistory(req, res) {
  res.render('history', {
    title: 'Search History',
    activePage: 'history',
  });
}

module.exports = {
  getHome,
  getFavorites,
  getHistory,
};
