const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {checkAuth} = require('../utils/checkAuth');

/* GET programming languages. */
router.get('/',userController.get);

/* PUT programming language */
router.put('/', checkAuth, userController.update);

module.exports = router;
