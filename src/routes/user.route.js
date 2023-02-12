const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {checkAuth} = require('../utils/checkAuth');

/* GET User details */
router.get('/',userController.get);

/* PUT Update User */
router.put('/', checkAuth, userController.update);

/* Get Issue Topics */
router.get('/getTopics', checkAuth, userController.getTopics);

/* GET User Balance */
// router.get('/getUserBalance', checkAuth, userController.getUserBalance);

/* PUT Update Online Status */
router.patch('/updateOnlineStatus', checkAuth, userController.updateOnlineStatus);


module.exports = router;
