const express = require('express');

const userRoutes = express.Router();

const {
  getUserByIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middelwares/validate');

const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getUserMe,
} = require('../controllers/userControllers');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserMe);
userRoutes.get('/:userId', getUserByIdValidation, getUserById);
userRoutes.patch('/me', updateUserValidation, updateUser);
userRoutes.patch('/me/avatar', updateAvatarValidation, updateAvatar);

exports.userRoutes = userRoutes;
