const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

const createCard = async (req, res, next) => {
  try {
    const likes = [];
    const id = req.user._id;
    const {
      name,
      link,
    } = req.body;

    const card = await Card.create({
      name,
      link,
      owner: id,
      likes,
    });

    res.send(card);
  } catch (err) {
    // console.log(err);
    if (err.name === 'ValidationError') {
      next(new ValidationError('Переданы некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  }
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError(`Карточка с указанным _id: ${cardId} не найдена`);
    })
    .then((card) => {
      if (String(req.user._id) === String(card.owner)) {
        Card.findByIdAndRemove(card._id)
          .then(() => {
            res.send({ message: 'Карточка удалена успешно!' });
          });
      } else {
        throw new ForbiddenError('Нет прав на удаление карточки');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError('Переданы неккоретные данные'));
      } else {
        next(err);
      }
    });
};

const likeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      });
    res.send(card);
  } catch (err) {
    // console.log(err);
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные при постановке лайка.'));
    } else {
      next(err);
    }
  }
};

const dislikeCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;

    const card = await Card.findByIdAndUpdate(
      cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      });
    res.send(card);
  } catch (err) {
    // console.log(err);
    if (err.name === 'CastError') {
      next(new ValidationError('Переданы некорректные данные для снятия лайка.'));
    } else {
      next(err);
    }
  }
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
