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

async function update(user_id, body) {
    try {
        const user = await User.findOneById({_id: user_id});
        if(!user) {
            return {status: 400, info: "User not found"};
        } else {
            const updatedUser = await User.findOneAndUpdate(user_id, {...body});
            updatedUser.save().then((savedDocument) => {
                return {status: 200, user: savedDocument};
            });          
        }
    } catch(err) {
        console.log("error in updating user", err.message);
        return { status: 400, info: err.message};
    }
    
}


module.exports = {
    get,
    update
}