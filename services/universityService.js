const axios = require('axios');
const AppError = require('../utils/AppError');

const BASE_URL = 'http://universities.hipolabs.com';
const TIMEOUT = 10000;

function normalizeUrl(url) {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `https://${url}`;
}

function formatUniversity(data) {
  const website = normalizeUrl(data.web_pages?.[0]);

  return {
    name: data.name,
    country: data.country,
    website,
    domain: data.domains?.[0] || null,
    stateProvince: data['state-province'] || null,
  };
}

function handleAxiosError(error) {
  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return new AppError('Unable to reach the universities API. Please check your connection.', 503, 'network');
  }

  return new AppError('Failed to fetch university data. Please try again later.', 502, 'api');
}

async function getUniversitiesByCountry(countryName, searchQuery = '') {
  if (!countryName?.trim()) {
    throw new AppError('Country name is required.', 400, 'validation');
  }

  const params = { country: countryName.trim() };

  if (searchQuery.trim()) {
    params.name = searchQuery.trim();
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/search`, {
      params,
      timeout: TIMEOUT,
    });

    return (data || []).map(formatUniversity).sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    throw handleAxiosError(error);
  }
}

module.exports = {
  getUniversitiesByCountry,
  formatUniversity,
};
