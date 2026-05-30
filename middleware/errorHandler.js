function notFoundHandler(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  const isDev = process.env.NODE_ENV === 'development';

  console.error(`[Error] ${statusCode} - ${err.message}`);

  res.status(statusCode).render('error', {
    title: 'Error',
    activePage: '',
    statusCode,
    message: err.message || 'Something went wrong',
    stack: isDev ? err.stack : null,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
