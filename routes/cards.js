const router = require('express').Router();
const { createCard, getCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardId', deleteCard);
router.post('/card', createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;