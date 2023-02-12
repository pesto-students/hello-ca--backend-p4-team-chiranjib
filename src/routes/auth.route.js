const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


/* POST Register User */
router.post('/register', authController.register);

/* POST Login User */
router.post('/login', authController.login);

/* GET Verify User OTP*/
router.get('/verifyOtp', authController.verifyOtp);
  

module.exports = router;
