const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getGifts);
router.post('/tofriend', controller.addGiftToFriend);
router.get('/:id', controller.getGiftById);
router.delete('/:id', controller.deleteGift);


module.exports = router;