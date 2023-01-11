const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const {checkAuth} = require('../utils/checkAuth');

/* create new order */
router.get('/', checkAuth, paymentController.orders);

/* check payment status */
router.put('/', checkAuth, userController.success);

module.exports = router;