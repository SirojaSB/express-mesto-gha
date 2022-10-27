const userRouter = require('express').Router();
const {
  getAllUsers,
  getUser,
  updateProfileInfo,
  updateAvatar,
  getUserInfo,
} = require('../controllers/user');
const { validateUserInfo, validateUserAvatar } = require('../utils/userValidate');

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUserInfo, updateProfileInfo);
userRouter.patch('/me/avatar', validateUserAvatar, updateAvatar);

module.exports = userRouter;
