const countryService = require('../services/countryService');
const holidayService = require('../services/holidayService');
const AppError = require('../utils/AppError');

async function getHolidays(req, res, next) {
  try {
    const country = await countryService.getCountryByName(req.params.name);
    const currentYear = new Date().getFullYear();
    const parsedYear = parseInt(req.query.year, 10);
    const selectedYear = Number.isNaN(parsedYear) ? currentYear : parsedYear;

    if (selectedYear < 1900 || selectedYear > 2100) {
      throw new AppError('Please select a valid year between 1900 and 2100.', 400);
    }

    const holidays = await holidayService.getHolidaysByYear(country.cca2, selectedYear);

    const upcoming =
      selectedYear === currentYear
        ? await holidayService.getUpcomingHolidays(country.cca2)
        : [];

    res.render('holidays', {
      title: `Holidays in ${country.name}`,
      activePage: 'home',
      activeTab: 'holidays',
      country,
      holidays,
      upcoming,
      selectedYear,
      currentYear,
      yearOptions: holidayService.getYearOptions(currentYear),
      resultCount: holidays.length,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHolidays,
};
