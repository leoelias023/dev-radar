const express = require('express');
const router = express.Router();

const devController = require('../../controllers/devController');

router.get('/listar' , devController.index);
router.post('/cadastro' , devController.store);      
router.post('/update' , devController.update);
router.post('/delete' , devController.destroy);
router.post('/deletetotal' , devController.destroyTotal);

module.exports = router;