const countryService = require('../services/countryService');
const universityService = require('../services/universityService');

async function getUniversities(req, res, next) {
  try {
    const country = await countryService.getCountryByName(req.params.name);
    const searchQuery = req.query.q?.trim() || '';

    const universities = await universityService.getUniversitiesByCountry(
      country.name,
      searchQuery
    );

    res.render('universities', {
      title: `Universities in ${country.name}`,
      activePage: 'home',
      activeTab: 'universities',
      country,
      universities,
      searchQuery,
      resultCount: universities.length,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getUniversities,
};
