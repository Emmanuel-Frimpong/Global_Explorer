const express = require('express');
const pageController = require('../controllers/pageController');
const countryController = require('../controllers/countryController');
const universityController = require('../controllers/universityController');
const holidayController = require('../controllers/holidayController');
const currencyController = require('../controllers/currencyController');

const router = express.Router();

router.get('/', pageController.getHome);
router.post('/search', countryController.postSearch);
router.get('/favorites', pageController.getFavorites);
router.get('/history', pageController.getHistory);
router.get('/country/:name/universities', universityController.getUniversities);
router.get('/country/:name/holidays', holidayController.getHolidays);
router.get('/country/:name/currency', currencyController.getCurrencyPage);
router.post('/country/:name/currency', currencyController.postConvert);
router.get('/country/:name', countryController.getCountryDetail);

module.exports = router;
