const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const checkAuth = require('../utils/checkAuth');

/* GET programming languages. */
router.get('/', userController.get);
  
/* POST programming language */
router.post('/', userController.create);

/* PUT programming language */
router.put('/:id', userController.update);

/* DELETE programming language */
router.delete('/:id', userController.remove);

module.exports = router;
