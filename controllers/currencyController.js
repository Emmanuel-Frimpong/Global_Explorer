const countryService = require('../services/countryService');
const currencyService = require('../services/currencyService');

async function renderCurrencyPage(req, res, next, options = {}) {
  try {
    const country = await countryService.getCountryByName(req.params.name);
    const currencies = await currencyService.getCurrencyCodes();

    const defaultBase = country.defaultCurrency;
    const defaultTarget = defaultBase === 'USD' ? 'EUR' : 'USD';

    res.render('currency', {
      title: `Currency Converter — ${country.name}`,
      activePage: 'home',
      activeTab: 'currency',
      country,
      currencies,
      conversion: options.conversion || null,
      error: options.error || null,
      form: {
        amount: options.form?.amount ?? '1',
        base: options.form?.base ?? defaultBase,
        target: options.form?.target ?? defaultTarget,
      },
    });
  } catch (error) {
    next(error);
  }
}

async function getCurrencyPage(req, res, next) {
  await renderCurrencyPage(req, res, next);
}

async function postConvert(req, res, next) {
  try {
    const amount = currencyService.validateAmount(req.body.amount);
    const base = req.body.base?.trim().toUpperCase();
    const target = req.body.target?.trim().toUpperCase();

    const conversion = await currencyService.convert(amount, base, target);

    await renderCurrencyPage(req, res, next, {
      conversion,
      form: { amount: req.body.amount, base, target },
    });
  } catch (error) {
    if (error.statusCode === 400) {
      return renderCurrencyPage(req, res, next, {
        error: error.message,
        form: {
          amount: req.body.amount || '1',
          base: req.body.base?.trim().toUpperCase() || 'USD',
          target: req.body.target?.trim().toUpperCase() || 'EUR',
        },
      });
    }
    next(error);
  }
}

module.exports = {
  getCurrencyPage,
  postConvert,
};
