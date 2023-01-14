const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { checkAuth } = require('../utils/checkAuth');


/* POST Create User Payment Entry*/
router.post('/createUserPaymentEntry', checkAuth, paymentController.createUserPaymentEntry);

module.exports = router;
