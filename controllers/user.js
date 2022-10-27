const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_KEY } = require('../utils/constants');
const BadRequestError = require('../utils/errors/badRequestError');
const NotFoundError = require('../utils/errors/notFoundError');
const ConflictError = require('../utils/errors/conflictError');

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).orFail(new NotFoundError('Пользователь не найден'));

    return res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Некорректные данные'));
    }
    return next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      name,
      about,
      avatar,
      email,
      password,
    } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });

    return res.send(user);
  } catch (err) {
    if (err.code === 11000) {
      next(new ConflictError('Пользователь с данным email уже зарегистрирован'));
    }
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Некорректные данные'));
    }
    return next(err);
  }
};

module.exports.updateProfileInfo = async (req, res, next) => {
  try {
    const { name, about } = req.body;

    const newProfileInfo = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );

    return res.send(newProfileInfo);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Некорректные данные'));
    }
    return next(err);
  }
};

module.exports.updateAvatar = async (req, res, next) => {
  try {
    const { avatar } = req.body;

    const newAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    );

    return res.send(newAvatar);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Некорректные данные'));
    }
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findUserByCredentials(email, password);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });

    return res.send(token);
  } catch (err) {
    return next(err);
  }
};

module.exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).orFail(new NotFoundError('Пользователь не найден'));

    return res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Некорректные данные'));
    }
    return next(err);
  }
};
