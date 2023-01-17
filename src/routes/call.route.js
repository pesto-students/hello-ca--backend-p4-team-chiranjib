const express = require('express');
const router = express.Router();
const callController = require('../controllers/call.controller');
const checkAuth = require('../utils/checkAuth');

/* GET User Balance */
router.get('/welcomeUser', callController.welcomeUser);
  
// /* POST Create Call Logs */
router.post('/createLogUserCall', callController.createLogUserCall);

// /* PUT programming language */
// router.put('/:id', callController.update);

// /* DELETE programming language */
// router.delete('/:id', callController.remove);

module.exports = router;
