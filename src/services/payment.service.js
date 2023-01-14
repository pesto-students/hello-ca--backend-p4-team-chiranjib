const User = require('../models/user.model');


async function createUserPaymentEntry(user_id, body) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            if (body.hasOwnProperty('recharge_amount')) {
                const recharge_amount = body.recharge_amount ? body.recharge_amount: 0;
                user.available_talk_time += (recharge_amount/process.env.PRICE_PER_SEC);
                await user.save();
                return { status: 200, user: user};  
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

module.exports = {
    createUserPaymentEntry
}