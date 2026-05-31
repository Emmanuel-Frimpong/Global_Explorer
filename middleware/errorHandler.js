function notFoundHandler(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

function getErrorTitle(statusCode, errorType) {
  const titles = {
    400: 'Invalid Request',
    404: 'Not Found',
    500: 'Server Error',
    502: 'Service Unavailable',
    503: 'Service Unavailable',
  };

  if (errorType === 'validation') {
    return 'Validation Error';
  }

  if (errorType === 'network') {
    return 'Network Error';
  }

  if (errorType === 'not_found') {
    return 'Not Found';
  }

  return titles[statusCode] || 'Error';
}

function getErrorSuggestion(errorType) {
  const suggestions = {
    validation: 'Please check your input and try again.',
    network: 'Please check your internet connection and try again.',
    not_found: 'The requested resource could not be found.',
    api: 'The service is temporarily unavailable. Please try again later.',
    server: 'Something went wrong on our end. Please try again later.',
  };

  return suggestions[errorType] || suggestions.server;
}

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);
  const isDev = process.env.NODE_ENV === 'development';
  const errorType = err.type || 'server';

  console.error(`[Error] ${statusCode} (${errorType}) - ${err.message}`);

  res.status(statusCode).render('error', {
    title: 'Error',
    activePage: '',
    statusCode,
    errorTitle: getErrorTitle(statusCode, errorType),
    message: err.message || 'Something went wrong',
    suggestion: getErrorSuggestion(errorType),
    errorType,
    stack: isDev ? err.stack : null,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
