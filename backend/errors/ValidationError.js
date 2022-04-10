class ValidationError extends Error {
  constructor(message = 'Переданы неккоретные данные') {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = ValidationError;
