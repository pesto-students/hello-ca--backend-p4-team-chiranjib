const {getUserIdFromToken} = require('../utils/checkAuth');
const userService = require('../services/user.service');
const paymentService = require('../services/payment.service');


async function createUserPaymentEntry(req, res, next) {
    try {
        console.log("in createUserPaymentEntry");
        const user_id = await getUserIdFromToken(req, res, next);
        res.json(await paymentService.createUserPaymentEntry(user_id, req.body));
    } catch (err) {
        console.error(`Error while creating user payment entry`, err.message);
        next(err);
    }
}

async function getUserPaymentHistory(req, res, next) {
    try {
      console.log("in getUserPaymentHistory");
        const user_id = await getUserIdFromToken(req, res, next);
        res.json(await paymentService.getUserPaymentHistory(user_id));
    } catch (err) {
        console.error(`Error while getting user details`, err.message);
        next(err);
    }
}

async function createCAPayoutEntry(req, res, next) {
    try {
        console.log("in createCAPayoutEntry");
        const user_id = await getUserIdFromToken(req, res, next);
        res.json(await paymentService.createCAPayoutEntry(user_id, req.body));
    } catch (err) {
        console.error(`Error while creating user payment entry`, err.message);
        next(err);
    }
}

async function getCAPaymentOutHistory(req, res, next) {
    try {
      console.log("in getCAPaymentOutHistory");
        const user_id = await getUserIdFromToken(req, res, next);
        res.json(await paymentService.getCAPaymentOutHistory(user_id));
    } catch (err) {
        console.error(`Error while getting ca payout history`, err.message);
        next(err);
    }
}


module.exports = {
    createUserPaymentEntry,
    getUserPaymentHistory,
    createCAPayoutEntry,
    getCAPaymentOutHistory
}
