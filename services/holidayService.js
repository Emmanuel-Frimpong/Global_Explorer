const axios = require('axios');
const AppError = require('../utils/AppError');

const BASE_URL = 'https://date.nager.at/api/v3';
const TIMEOUT = 10000;

function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatHoliday(data) {
  return {
    name: data.name,
    localName: data.localName,
    date: data.date,
    formattedDate: formatDate(data.date),
    types: data.types?.join(', ') || 'Public',
    isGlobal: data.global,
  };
}

function handleAxiosError(error, countryCode) {
  if (error.response?.status === 404) {
    return new AppError(
      `Holiday data is not available for country code "${countryCode}".`,
      404
    );
  }

  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return new AppError('Unable to reach the holidays API. Please check your connection.', 503);
  }

  return new AppError('Failed to fetch holiday data. Please try again later.', 502);
}

async function getHolidaysByYear(countryCode, year) {
  if (!countryCode?.trim()) {
    throw new AppError('Country code is required.', 400);
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}/PublicHolidays/${year}/${countryCode.toUpperCase()}`,
      { timeout: TIMEOUT }
    );

    return (data || [])
      .map(formatHoliday)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    throw handleAxiosError(error, countryCode);
  }
}

async function getUpcomingHolidays(countryCode) {
  if (!countryCode?.trim()) {
    throw new AppError('Country code is required.', 400);
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}/NextPublicHolidays/${countryCode.toUpperCase()}`,
      { timeout: TIMEOUT }
    );

    return (data || [])
      .map(formatHoliday)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  } catch (error) {
    if (error.response?.status === 404) {
      return [];
    }
    throw handleAxiosError(error, countryCode);
  }
}

function getYearOptions(currentYear, range = 3) {
  const years = [];
  for (let y = currentYear - range; y <= currentYear + range; y += 1) {
    years.push(y);
  }
  return years;
}

module.exports = {
  getHolidaysByYear,
  getUpcomingHolidays,
  getYearOptions,
  formatHoliday,
};
