const axios = require('axios');

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const BASE_URL = 'https://api.pexels.com/v1';
const TIMEOUT = 10000;

// Offline fallback images for feature cards when Pexels API is unavailable
const OFFLINE_CARD_IMAGES = {
  country: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
  university: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
  holiday: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
  currency: 'https://images.unsplash.com/photo-1579621970563-eb87567075e1?q=80&w=1200&auto=format&fit=crop',
  search: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  favorites: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
};

// Feature images for the home page feature cards
const FEATURE_IMAGES = {
  country: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop',
  university: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1200&auto=format&fit=crop',
  holiday: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop',
  currency: 'https://images.unsplash.com/photo-1579621970563-eb87567075e1?q=80&w=1200&auto=format&fit=crop',
  search: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
  favorites: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop',
};

async function getFeatureImages() {
  // If no API key is configured, return offline images
  if (!PEXELS_API_KEY) {
    console.log('[Pexels Service] No API key configured, using offline images');
    return FEATURE_IMAGES;
  }

  try {
    // Try to fetch images from Pexels API
    const queries = ['travel', 'university', 'celebration', 'money', 'search', 'favorite'];
    const keys = ['country', 'university', 'holiday', 'currency', 'search', 'favorites'];
    
    const images = {};
    
    for (let i = 0; i < queries.length; i++) {
      try {
        const response = await axios.get(`${BASE_URL}/search`, {
          headers: {
            Authorization: PEXELS_API_KEY,
          },
          params: {
            query: queries[i],
            per_page: 1,
            orientation: 'landscape',
          },
          timeout: TIMEOUT,
        });
        
        if (response.data.photos && response.data.photos.length > 0) {
          images[keys[i]] = response.data.photos[0].src.large;
        } else {
          images[keys[i]] = FEATURE_IMAGES[keys[i]];
        }
      } catch (err) {
        console.log(`[Pexels Service] Failed to fetch image for "${queries[i]}", using fallback`);
        images[keys[i]] = FEATURE_IMAGES[keys[i]];
      }
    }
    
    return images;
  } catch (error) {
    console.error('[Pexels Service] Error fetching feature images:', error);
    return FEATURE_IMAGES;
  }
}

async function searchPhotos(query, count = 1, orientation = 'landscape') {
  // If no API key is configured, return empty array
  if (!PEXELS_API_KEY) {
    return [];
  }

  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: count,
        orientation,
      },
      timeout: TIMEOUT,
    });

    return response.data.photos.map((photo) => ({
      url: photo.src.large,
      alt: photo.alt || query,
    }));
  } catch (error) {
    console.error(`[Pexels Service] Error searching photos for "${query}":`, error);
    return [];
  }
}

module.exports = {
  OFFLINE_CARD_IMAGES,
  getFeatureImages,
  searchPhotos,
};
