const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getClients);
router.post('/', controller.addClient);

router.get("/:id", controller.getClientsById);


module.exports = router;