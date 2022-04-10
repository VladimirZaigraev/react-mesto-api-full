const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

const createUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    about: Joi.string().optional().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }),
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().min(8).message({
      'string.min': 'Минимальная длина поля "password" - 8',
    }),
  }),
});

const loginValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Невалидный email!');
    }).message({
      'any.required': 'Поле "email" должно быть заполнено',
    }),
    password: Joi.string().required().min(8).message({
      'string.min': 'Минимальная длина поля "password" - 8',
    }),
  }),
});

const updateUserValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().optional().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
    about: Joi.string().optional().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "about" - 2',
        'string.max': 'Максимальная длина поля "about" - 30',
      }),
  }),
});

const updateAvatarValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }).required(),
  }),
});

const getUserByIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

const getUserMeValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

const createCardValidation = celebrate({
  [Segments.BODY]: Joi.object().keys({
    link: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Невалидный URL!');
    }).message({
      'any.required': 'Поле "link" должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30)
      .message({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const cardIdValidation = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      })
      .message({
        'string.length': 'Длина поля - 24',
      }),
  }),
});

module.exports = {
  createUserValidation,
  updateUserValidation,
  loginValidation,
  updateAvatarValidation,
  getUserByIdValidation,
  cardIdValidation,
  createCardValidation,
  getUserMeValidation,
};
