const mongoose = require('mongoose');
const User = require('../models/user');

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).orFail(new Error('NotFound'));

    return res.send(user);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь не найдет' });
    }
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Некорректные данные', err });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    return res.send(user);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Некорректные данные' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.updateProfileInfo = async (req, res) => {
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
      return res.status(400).send({ message: 'Некорректные данные' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.updateAvatar = async (req, res) => {
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
      return res.status(400).send({ message: 'Некорректные данные' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};
