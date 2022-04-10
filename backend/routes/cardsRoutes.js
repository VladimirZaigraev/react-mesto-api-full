const express = require('express');

const cardRoutes = express.Router();

const {
  createCardValidation,
  cardIdValidation,
} = require('../middelwares/validate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardControllers');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCardValidation, createCard);
cardRoutes.delete('/:cardId', cardIdValidation, deleteCard);
cardRoutes.put('/:cardId/likes', cardIdValidation, likeCard);
cardRoutes.delete('/:cardId/likes', cardIdValidation, dislikeCard);

exports.cardRoutes = cardRoutes;
