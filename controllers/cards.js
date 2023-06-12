const Card = require('../models/card');

module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
  const { name, link } = req.body;

  Card.create({ name, link })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  if (!Card.find(req.params.id)) {
    res.send(`Такой карточки не существует`);
    return;
  }

  Card.findByIdAndRemove(req.params.id)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка  ${err}` }));
};

module.exports.likeCard = (req, res) => {
  if (!Card.find(req.params.id)) {
    res.send(`Такой карточки не существует`);
    return;
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
};

module.exports.dislikeCard = (req, res) => {
  if (!Card.find(req.params.id)) {
    res.send(`Такой карточки не существует`);
    return;
  }

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
};