const countryService = require('../services/countryService');

async function postSearch(req, res, next) {
  try {
    const query = req.body.query?.trim();

    if (!query) {
      return res.redirect('/?error=empty');
    }

    const results = await countryService.searchCountries(query);

    if (results.length === 0) {
      return res.redirect(`/?error=notfound&query=${encodeURIComponent(query)}`);
    }

    if (results.length === 1) {
      return res.redirect(`/country/${encodeURIComponent(results[0].slug)}`);
    }

    res.render('search-results', {
      title: `Results for "${query}"`,
      activePage: 'home',
      query,
      countries: results,
      resultCount: results.length,
    });
  } catch (error) {
    next(error);
  }
}

async function getCountryDetail(req, res, next) {
  try {
    const country = await countryService.getCountryByName(req.params.name);

    res.render('country', {
      title: country.name,
      activePage: 'home',
      activeTab: 'overview',
      country,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postSearch,
  getCountryDetail,
};
