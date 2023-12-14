const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getEvents);
router.post('/', controller.addEvent);
router.post('/weekend', controller.addWeekend);

router.get('/myWeekends/:id', controller.getAllWeekends)
router.get("/:id", controller.getEventsById);


module.exports = router;