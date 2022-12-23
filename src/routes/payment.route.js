const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const checkAuth = require('../utils/checkAuth');

/* GET programming languages. */
// router.get('/', paymentController.get);
  
/* POST programming language */
// router.post('/', paymentController.create);

/* PUT programming language */
// router.put('/:id', paymentController.update);

/* DELETE programming language */
// router.delete('/:id', paymentController.remove);

module.exports = router;
