const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.status(201).send(user))
    .catch(err => {
      res.status(400).send({ message: `Переданы некорректные данные при создании пользователя` });
      res.status(500).send({ message: `Произошла ошибка  ${err}` });
     });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.status(200).send(users))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.user._id)
    .then(user => res.status(200).send(user))
    .catch(err => {
      res.status(404).send({ message: `Такого пользователя не существует` });
      res.status(500).send({ message: `Произошла ошибка  ${err}` });
    });
};

module.exports.updateProfile = (req, res) => {
  console.log(req.body);
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => {
      res.status(400).send({ message: `Переданы некорректные данные при обновлении профиля` });
      res.status(404).send({ message: `Такого пользователя не существует` });
      res.status(500).send({ message: `Произошла ошибка  ${err}` });
     });
};

module.exports.updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true })
    .then(user => res.send(user))
    .catch(err => {
      res.status(400).send({ message: `Переданы некорректные данные при обновлении аватара` });
      res.status(404).send({ message: `Такого пользователя не существует` });
      res.status(500).send({ message: `Произошла ошибка  ${err}` });
     });
};