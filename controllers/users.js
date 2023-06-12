const User = require('../models/user');

const errorWorker = (err) => {

}

console.log('fff');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.getUsers = (req, res) => {
  console.log('ddd');
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.getUser = (req, res) => {
  if (!User.find(req.params.id)) {
    res.send(`Такого пользователя не существует`);
    return;
  }

  User.find(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.updateProfile = (req, res) => {
  User.find(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.updateAvatar = (req, res) => {
  User.find(req.params.id)
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};