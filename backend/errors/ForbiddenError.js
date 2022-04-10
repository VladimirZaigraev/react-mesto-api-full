class ForbiddenError extends Error {
  constructor(message = 'Нет прав доступа') {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = ForbiddenError;
