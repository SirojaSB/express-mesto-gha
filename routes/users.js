const userRouter = require('express').Router();
const {
  getAllUsers,
  getUser,
  createUser,
  updateProfileInfo,
  updateAvatar
} = require('../controllers/user');

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getUser);
userRouter.post('/', createUser);
userRouter.patch('/me', updateProfileInfo);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
