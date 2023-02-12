const express = require('express');
const router = express.Router();
const callController = require('../controllers/call.controller');

/* GET User Balance */
router.get('/welcomeUser', callController.welcomeUser);
  
// /* POST Create Call Logs */
router.get('/createLogUserCall', callController.createLogUserCall);

/* GET CA List */
router.get('/getCaList', callController.getCaList);

/* Get CA Call Log List */
router.get('/getCallLogsForCA', callController.getCallLogsForCA);

/* Get CA Call Log List */
router.get('/getCallLogsForUser', callController.getCallLogsForUser);


module.exports = router;
