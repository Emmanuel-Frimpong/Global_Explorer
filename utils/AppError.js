class AppError extends Error {
  constructor(message, statusCode = 500, type = 'server') {
    super(message);
    this.statusCode = statusCode;
    this.name = 'AppError';
    this.type = type;
    this.isOperational = true;
  }
}

module.exports = AppError;
