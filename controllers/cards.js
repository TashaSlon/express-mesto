const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id, likes: [] })
    .then(card => res.status(201).send(card))
    .catch(err => {
      res.status(400).send({ message: `Переданы некорректные данные при создании карточки` });
      res.status(500).send({ message: `Произошла ошибка  ${err}` });
     });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send(card))
    .catch(err => {
      res.status(500).send({ message: `Произошла ошибка  ${err}` });
     });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send(card))
    .catch(err => {
      res.status(404).send({ message: `Карточка с указанным _id не найдена` });
      res.status(500).send({ message: `Произошла ошибка  ${err}` });
     });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  ).then(card => res.send(card))
  .catch(err => {
    res.status(400).send({ message: `Переданы некорректные данные для постановки лайка` });
    res.status(404).send({ message: `Карточка с указанным _id не найдена` });
    res.status(500).send({ message: `Произошла ошибка  ${err}` });
   });
};

module.exports.dislikeCard = (req, res) => {

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  ).then(card => res.send(card))
  .catch(err => {
    res.status(400).send({ message: `Переданы некорректные данные для снятия лайка` });
    res.status(404).send({ message: `Карточка с указанным _id не найдена` });
    res.status(500).send({ message: `Произошла ошибка  ${err}` });
   });
};