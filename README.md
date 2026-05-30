# Global Explorer Dashboard

A modern Node.js + Express + EJS web application for exploring countries worldwide.

## Status

| Phase | Description              | Status   |
|-------|--------------------------|----------|
| 1     | Project Architecture     | Complete |
| 2     | UI/UX Foundation         | Complete |
| 3     | Country Search (API)     | Complete |
| 4     | Universities Module      | Complete |
| 5     | Public Holidays Module   | Complete |
| 6     | Currency Converter       | Complete |
| 7     | Favorites System         | Complete |

## Technologies

- Node.js
- Express.js
- EJS
- Axios
- Morgan
- Dotenv
- Poppins (Google Fonts)

## Installation

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=development
```

## Scripts

| Command       | Description                    |
|---------------|--------------------------------|
| `npm start`   | Run the production server      |
| `npm run dev` | Run with nodemon (development) |

## Pages

| Route            | Description                          |
|------------------|--------------------------------------|
| `/`              | Home — hero, search, feature cards   |
| `/search` (POST) | Search countries via REST Countries API |
| `/country/:name` | Country detail from live API data         |
| `/country/:name/universities` | Universities list with search |
| `/country/:name/holidays` | Public holidays with year filter |
| `/country/:name/currency` | Currency converter (GET/POST) |
| `/favorites`     | Saved countries (localStorage)       |
| `/history`       | Recent searches (localStorage)       |

## APIs

| API | Usage |
|-----|-------|
| [REST Countries](https://restcountries.com) | Country search and detail data |
| [Universities Hipolabs](http://universities.hipolabs.com) | University listings by country |
| [Nager.Date](https://date.nager.at) | Public holidays by country and year |
| [Open ER API](https://open.er-api.com) | Live exchange rates and conversion |

## Folder Structure

```
├── app.js
├── package.json
├── routes/
├── controllers/
│   ├── pageController.js
│   ├── countryController.js
│   └── universityController.js
│   └── holidayController.js
│   └── currencyController.js
├── services/
│   ├── countryService.js
│   ├── universityService.js
│   ├── holidayService.js
│   └── currencyService.js
├── middleware/
├── utils/
│   └── AppError.js
├── views/
│   ├── partials/
│   ├── index.ejs
│   ├── country.ejs
│   ├── search-results.ejs
│   ├── universities.ejs
│   ├── holidays.ejs
│   ├── currency.ejs
│   ├── favorites.ejs
│   ├── history.ejs
│   └── error.ejs
├── public/
│   ├── css/main.css
│   └── js/
│       ├── favoritesStore.js
│       └── favorites.js
└── README.md
```

## Design System

- **Primary:** `#2563EB`
- **Font:** Poppins
- **Style:** Card layouts, soft shadows, rounded corners, smooth transitions

## License

ISC
