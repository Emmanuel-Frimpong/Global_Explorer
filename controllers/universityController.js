const countryService = require('../services/countryService');
const universityService = require('../services/universityService');
const pexelsService = require('../services/pexelsService');

async function getUniversities(req, res, next) {
  try {
    const country = await countryService.getCountryByName(req.params.name);
    const searchQuery = req.query.q?.trim() || '';

    const universities = await universityService.getUniversitiesByCountry(
      country.name,
      searchQuery
    );

    // Fetch 20 campus images in one API request (complying with the 1-2 request budget per view)
    const campusImages = await pexelsService.searchPhotos(
      `${country.name} university`,
      20,
      'university campus'
    );

    // Header image is the first returned photo or the fallback campus image
    const campusHeaderImage = campusImages.length > 0 
      ? campusImages[0].url 
      : pexelsService.OFFLINE_CARD_IMAGES.universities;

    // Distribute images round-robin style to all university cards
    const universitiesWithImages = universities.map((uni, idx) => {
      const imgUrl = campusImages.length > 0
        ? campusImages[idx % campusImages.length].url
        : pexelsService.OFFLINE_CARD_IMAGES.universities;
      return {
        ...uni,
        image: imgUrl
      };
    });

    res.render('universities', {
      title: `Universities in ${country.name}`,
      activePage: 'home',
      activeTab: 'universities',
      country,
      universities: universitiesWithImages,
      campusHeaderImage,
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
