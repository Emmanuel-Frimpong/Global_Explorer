const imageService = require('../services/imageService');
const pexelsService = require('../services/pexelsService');

async function getHome(req, res) {
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

  try {
    // Fetch beautiful background images from Pexels for our six feature cards
    const featureImages = await pexelsService.getFeatureImages();

    // Dynamically retrieve real-world country-specific Pexels photos for the popular destinations cards
    // Uses the cache and falls back cleanly to verified Unsplash URLs if offline or empty
    const destinationsWithImages = await Promise.all(
      imageService.curatedDestinations.map(async (dest) => {
        try {
          const photos = await pexelsService.searchPhotos(dest.name, 1, `${dest.name} travel`);
          return {
            ...dest,
            image: photos.length > 0 ? photos[0].url : dest.image
          };
        } catch (err) {
          console.error(`[Page Controller] Dynamic Pexels image lookup failed for destination "${dest.name}":`, err);
          return dest;
        }
      })
    );

    res.render('index', {
      title: 'Home',
      activePage: 'home',
      alert,
      searchQuery: query,
      destinations: destinationsWithImages,
      featureImages,
    });
  } catch (error) {
    console.error('[Page Controller] Error loading home page assets:', error);
    // Fallback: render even if fetching fails
    res.render('index', {
      title: 'Home',
      activePage: 'home',
      alert,
      searchQuery: query,
      destinations: imageService.curatedDestinations,
      featureImages: pexelsService.OFFLINE_CARD_IMAGES,
    });
  }
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
