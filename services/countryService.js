const axios = require('axios');
const AppError = require('../utils/AppError');

const BASE_URL = 'https://restcountries.com/v3.1';
const TIMEOUT = 10000;

function formatCountry(data) {
  const languages = data.languages
    ? Object.values(data.languages).join(', ')
    : 'N/A';

  const currencyList = data.currencies
    ? Object.entries(data.currencies).map(([code, info]) => ({
        code,
        name: info.name,
        symbol: info.symbol || '',
      }))
    : [];

  const currency = currencyList.length
    ? currencyList.map(({ name, code }) => `${name} (${code})`).join(', ')
    : 'N/A';

  return {
    name: data.name.common,
    officialName: data.name.official,
    slug: data.name.common.toLowerCase(),
    flag: data.flags?.png || data.flags?.svg || '',
    flagAlt: data.flags?.alt || `Flag of ${data.name.common}`,
    capital: data.capital?.[0] || 'N/A',
    population: data.population?.toLocaleString('en-US') || 'N/A',
    region: data.region || 'N/A',
    subregion: data.subregion || 'N/A',
    languages,
    currency,
    currencyList,
    defaultCurrency: currencyList[0]?.code || 'USD',
    timezone: data.timezones?.join(', ') || 'N/A',
    cca2: data.cca2,
    cca3: data.cca3,
  };
}

function handleAxiosError(error) {
  if (error.response?.status === 404) {
    return new AppError('Country not found', 404);
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return new AppError('Unable to reach the countries API. Please check your connection.', 503);
  }

  return new AppError('Failed to fetch country data. Please try again later.', 502);
}

async function searchCountries(query) {
  const trimmed = query.trim();

  if (!trimmed) {
    throw new AppError('Please enter a country name to search.', 400);
  }

  if (trimmed.length < 2) {
    throw new AppError('Search query must be at least 2 characters.', 400);
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/name/${encodeURIComponent(trimmed)}`, {
      params: { fullText: false },
      timeout: TIMEOUT,
    });

    return data.map(formatCountry);
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw handleAxiosError(error);
  }
}

async function getCountryByName(name) {
  const decoded = decodeURIComponent(name).trim();

  if (!decoded) {
    throw new AppError('Country name is required.', 400);
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/name/${encodeURIComponent(decoded)}`, {
      params: { fullText: true },
      timeout: TIMEOUT,
    });

    if (data.length > 0) {
      return formatCountry(data[0]);
    }
  } catch (error) {
    if (error.response?.status !== 404) {
      throw handleAxiosError(error);
    }
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/name/${encodeURIComponent(decoded)}`, {
      params: { fullText: false },
      timeout: TIMEOUT,
    });

    if (!data || data.length === 0) {
      throw new AppError(`No country found for "${decoded}".`, 404);
    }

    const normalized = decoded.toLowerCase();
    const exactMatch = data.find((c) => c.name.common.toLowerCase() === normalized);

    return formatCountry(exactMatch || data[0]);
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.response?.status === 404) {
      throw new AppError(`No country found for "${decoded}".`, 404);
    }
    throw handleAxiosError(error);
  }
}

module.exports = {
  searchCountries,
  getCountryByName,
  formatCountry,
};
