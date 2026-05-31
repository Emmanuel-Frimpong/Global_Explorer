const axios = require('axios');
const AppError = require('../utils/AppError');

const BASE_URL = 'https://open.er-api.com/v6/latest';
const TIMEOUT = 10000;
const CACHE_TTL = 60 * 60 * 1000;

const cache = new Map();

function formatMoney(value, currencyCode) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function handleAxiosError(error) {
  if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
    return new AppError('Unable to reach the exchange rate API. Please check your connection.', 503, 'network');
  }

  return new AppError('Failed to fetch exchange rate data. Please try again later.', 502, 'api');
}

async function getRates(baseCode) {
  const base = baseCode.toUpperCase().trim();
  const cached = cache.get(base);

  if (cached && cached.expires > Date.now()) {
    return cached.data;
  }

  try {
    const { data } = await axios.get(`${BASE_URL}/${base}`, { timeout: TIMEOUT });

    if (data.result !== 'success') {
      throw new AppError('Exchange rate API returned an unsuccessful response.', 502, 'api');
    }

    const payload = {
      base: data.base_code,
      rates: data.rates,
      lastUpdate: data.time_last_update_utc,
      nextUpdate: data.time_next_update_utc,
    };

    cache.set(base, { data: payload, expires: Date.now() + CACHE_TTL });

    return payload;
  } catch (error) {
    if (error instanceof AppError) throw error;
    if (error.response?.status === 404) {
      throw new AppError(`Unsupported base currency "${base}".`, 400, 'validation');
    }
    throw handleAxiosError(error);
  }
}

async function getCurrencyCodes() {
  const { rates } = await getRates('USD');
  return Object.keys(rates).sort();
}

async function convert(amount, baseCode, targetCode) {
  const base = baseCode.toUpperCase().trim();
  const target = targetCode.toUpperCase().trim();

  if (!base || !target) {
    throw new AppError('Both base and target currencies are required.', 400, 'validation');
  }

  if (base === target) {
    return {
      amount,
      base,
      target,
      rate: 1,
      converted: amount,
      formattedAmount: formatMoney(amount, base),
      formattedConverted: formatMoney(amount, target),
      lastUpdate: null,
      nextUpdate: null,
    };
  }

  const ratesData = await getRates(base);
  const rate = ratesData.rates[target];

  if (!rate) {
    throw new AppError(`Unsupported target currency "${target}".`, 400, 'validation');
  }

  const converted = amount * rate;

  return {
    amount,
    base,
    target,
    rate,
    converted,
    formattedAmount: formatMoney(amount, base),
    formattedConverted: formatMoney(converted, target),
    lastUpdate: ratesData.lastUpdate,
    nextUpdate: ratesData.nextUpdate,
  };
}

function validateAmount(value) {
  const amount = parseFloat(value);

  if (Number.isNaN(amount) || amount <= 0) {
    throw new AppError('Please enter a valid amount greater than zero.', 400, 'validation');
  }

  if (amount > 1_000_000_000) {
    throw new AppError('Amount exceeds the maximum allowed value.', 400, 'validation');
  }

  return amount;
}

module.exports = {
  getRates,
  getCurrencyCodes,
  convert,
  validateAmount,
  formatMoney,
};
