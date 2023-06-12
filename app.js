const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000, BASE_PATH } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', routerUsers);
app.use('/cards', routerCards);
app.use((req, res, next) => {
  req.user = {
    _id: '6482d2b5dd33d23abf3701a9' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect('mongodb://localhost:27017/mestodb', {
});

//app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
  console.log('Ссылка на сервер');
  console.log(BASE_PATH);
});