const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/user');
const { verifyToken } = require('./middlewares/auth');
const { validateLoginData, validateCreateUserData } = require('./utils/userValidate');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', verifyToken, userRouter);
app.use('/cards', verifyToken, cardRouter);
app.use('/signin', validateLoginData, login);
app.use('/signup', validateCreateUserData, createUser);
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый адрес не найден',
  });
});

app.use(errors());
app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;

  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });

  next();
});

app.listen(PORT);
