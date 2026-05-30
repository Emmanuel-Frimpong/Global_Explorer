require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const path = require('path');

const requestTiming = require('./middleware/requestTiming');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const indexRoutes = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));
app.use(requestTiming);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Global Explorer Dashboard running at http://localhost:${PORT}`);
});
