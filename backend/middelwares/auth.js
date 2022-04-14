// middlewares/auth.js
const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const token = req.headers.authorization.replace('Bearer ', '');
  // console.log('auth token', token);
  if (!token) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  let payload;

  try {
    // верифицируем токен
    payload = jwt.verify(token, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new UnauthorizedError('Необходима авторизация - не получилось верифицировать токен'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  return next(); // пропускаем запрос дальше
};
