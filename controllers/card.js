const mongoose = require('mongoose');
const Card = require('../models/card');

module.exports.getAllCards = async (req, res) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({ name, link, owner: req.user._id });

    res.send({
      message: 'Карточка успешно создана',
    });
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(400).send({ message: 'Некорректные данные' });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndRemove(req.params.cardId).orFail(new Error('NotFound'));

    res.send(card);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь не найдет' });
    }

    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Некорректные данные' });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NotFound'));

    res.send(card);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь не найдет' });
    }

    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Некорректные данные' });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};

module.exports.dislikeCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(new Error('NotFound'));

    res.send(card);
  } catch (err) {
    if (err.message === 'NotFound') {
      return res.status(404).send({ message: 'Пользователь не найдет' });
    }

    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).send({ message: 'Некорректные данные' });
    }

    return res.status(500).send({ message: 'На сервере произошла ошибка', err });
  }
};
