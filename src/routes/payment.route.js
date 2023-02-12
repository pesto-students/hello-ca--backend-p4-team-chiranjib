const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const { checkAuth } = require('../utils/checkAuth');


/* POST Create User Payment Entry*/
router.post('/createUserPaymentEntry', checkAuth, paymentController.createUserPaymentEntry);

/* GET User Payment List*/
router.get('/getUserPaymentHistory', checkAuth, paymentController.getUserPaymentHistory);

/* POST CA Payment Entry*/
router.post('/createCAPayoutEntry', checkAuth, paymentController.createCAPayoutEntry);

/* POST CA PaymentOut List*/
router.get('/getCAPaymentOutHistory', checkAuth, paymentController.getCAPaymentOutHistory);

module.exports = router;
