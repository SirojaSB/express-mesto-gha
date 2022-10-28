const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { createUser, login } = require('../controllers/user');
const { verifyToken } = require('../middlewares/auth');
const { validateLoginData, validateCreateUserData } = require('../utils/userValidate');
const NotFoundError = require('../utils/errors/notFoundError');

router.post('/signin', validateLoginData, login);
router.post('/signup', validateCreateUserData, createUser);

router.use(verifyToken);

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use('*', (req, res, next) => next(new NotFoundError('Некорректный URL адрес')));

module.exports = router;
