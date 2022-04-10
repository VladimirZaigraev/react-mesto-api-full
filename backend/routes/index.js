const express = require('express');
const { userRoutes } = require('./usersRoutes');
const { cardRoutes } = require('./cardsRoutes');
const NotFoundError = require('../errors/NotFoundError');

const routes = express.Router();

routes.use('/users', userRoutes);
routes.use('/cards', cardRoutes);
routes.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

exports.routes = routes;
