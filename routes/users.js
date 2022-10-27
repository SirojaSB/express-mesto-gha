const userRouter = require('express').Router();
const {
  getAllUsers,
  getUser,
  updateProfileInfo,
  updateAvatar,
  getUserInfo,
} = require('../controllers/user');
const { validateUserInfo, validateUserAvatar, validateUserId } = require('../utils/userValidate');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getUserInfo);
userRouter.get('/:id', validateUserId, getUser);
userRouter.patch('/me', validateUserInfo, updateProfileInfo);
userRouter.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = userRouter;
