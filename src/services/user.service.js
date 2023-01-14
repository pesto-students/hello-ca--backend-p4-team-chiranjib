const User = require('../models/user.model');


async function get(user_id) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            return {status: 200, user: user};
        }
    } catch(err) {
        console.log("error in get user func", err.message);
        return { status: 400, info: err.message};
    }
}

async function getSpecializationArray(userSpecializationList) {
    if(!userSpecializationList) {
        return null
    } else {
        let specializationList = [];
        console.log(userSpecializationList.split(','));
        specializationList = userSpecializationList.split(',');
        return specializationList;
    }
}

async function update(user_id, body) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            user.first_name = body.first_name ? body.first_name: null;
            user.last_name = body.last_name ? body.last_name: null;
            user.specialization = body.specialization? getSpecializationArray(body.specialization): null;
            
            await user.save();
            return { status: 200, user: user};         
        }
    } catch(err) {
        console.log("error in updating user", err.message);
        return { status: 400, info: err.message};
    }
    
}


async function updateOnlineStatus(user_id, body) {
    try {
        const user = await User.findById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            user.is_online = body.is_online;
            await user.save();
            return { status: 200, user: user};         
        }
    } catch(err) {
        console.log("error in updating user online status", err.message);
        return { status: 400, info: err.message};
    }
}

async function updateUserTalkTime(user, amount) {
    try {
        user.available_talk_time += (amount/process.env.PRICE_PER_SEC);
        await user.save();
        return { status: 200, user: user};  
    } catch(err) {
        console.log("error in updating user talk time", err.message);
        return { status: 400, info: err.message};
    }
}

module.exports = {
    get,
    update,
    getSpecializationArray,
    updateOnlineStatus,
    updateUserTalkTime
}