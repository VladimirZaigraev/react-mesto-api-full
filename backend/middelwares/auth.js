// middlewares/auth.js
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация - не получилось верифицировать токен'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
