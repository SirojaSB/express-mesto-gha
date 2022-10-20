const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '634d1e42e8dcdeb12aa8ab56',
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use('*', (req, res) => {
  res.status(404).send({
    message: 'Запрашиваемый адрес не найден',
  });
});

app.listen(PORT);
