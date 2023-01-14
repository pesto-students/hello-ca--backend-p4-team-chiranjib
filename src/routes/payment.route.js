const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { checkAuth } = require('../utils/checkAuth');


/* POST Create User Payment Entry*/
router.post('/createUserPaymentEntry', checkAuth, paymentController.createUserPaymentEntry);

/* GET User Payment History*/
router.get('/getUserPaymentHistory', checkAuth, paymentController.getUserPaymentHistory);

module.exports = router;
