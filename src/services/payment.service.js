const User = require('../models/user.model');
const Payment = require('../models/payment.modal');
const { updateUserTalkTime } = require('./user.service');


async function createUserPaymentEntry(user_id, body) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            if (body.hasOwnProperty('amount')) {
                const amount = body.recharge_amount ? body.amount: 0;
                const paymentObj = {
                    user: user_id,
                    amount: body.amount ? body.amount : 0,
                    tax: body.amount ? body.amount * 0.18: 0,
                    status_client: body.status_client ? body.status_client : true,
                    minutes_purchased: body.minutes_purchased ? body.minutes_purchased : 0
                }
                const payment = await Payment.create(paymentObj);
                return (await updateUserTalkTime(user, payment.amount));
            } else {
                console.log("no recharge_amount key present in body", err.message);
                return { status: 400, info: "recharge_amount key not sent"};
            }       
        }
    } catch(err) {
        console.log("error in updating user", err.message);
        return { status: 400, info: err.message};
    }
}

async function getUserPaymentHistory(user_id) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            const paymentHistory = await Payment.find({user: user_id});
            return {status: 200, payments: paymentHistory};
        }
    } catch(err) {
        console.log("error in updating user", err.message);
        return { status: 400, info: err.message};
    }
}

async function createCAPayoutEntry(user_id, body) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            if (body.hasOwnProperty('amount')) {
                const paymentObj = {
                    user: user_id,
                    amount: body.amount ? body.amount : 0,
                    tax: body.amount ? body.amount * 0.18: 0,
                    reference_number: body.reference_number ? body.reference_number : 0,
                    direction: "outward"
                }
                const paymentOut = await Payment.create(paymentObj);
                return {status: 200, payment: paymentOut};
            } else {
                console.log("no recharge_amount key present in body", err.message);
                return { status: 400, info: "recharge_amount key not sent"};
            }       
        }
    } catch(err) {
        console.log("error in updating user", err.message);
        return { status: 400, info: err.message};
    }
}

async function getCAPaymentOutHistory(user_id) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            const paymentOutHistory = await Payment.find({user: user_id, direction: "outward"});
            return {status: 200, payments: paymentOutHistory};
        }
    } catch(err) {
        console.log("error in updating user", err.message);
        return { status: 400, info: err.message};
    }
}


module.exports = {
    createUserPaymentEntry,
    getUserPaymentHistory,
    createCAPayoutEntry,
    getCAPaymentOutHistory
}