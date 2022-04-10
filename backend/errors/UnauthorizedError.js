class Unauthorized extends Error {
  constructor(message = 'Ошибка авторизации') {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = Unauthorized;
