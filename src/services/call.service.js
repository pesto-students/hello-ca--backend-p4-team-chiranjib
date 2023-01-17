const languages = require('../enums/languages.enum');
const {Call, CallLog} = require('../models/call.modal');
const User = require('../models/user.model');


async function welcomeUser(queryParameters){
    // console.log("queryParametrs", parseInt((queryParameters.CallFrom).substring(1)));
    try {
        const userPhoneNumber = parseInt((queryParameters.CallFrom).substring(1));
        // console.log(userPhoneNumber);
        const user = await User.findOne({mobile: userPhoneNumber});
        if(!user) {
            return "Sorry, you are not registered yet not";
          } else {
            console.log("inside user", user);
            if(user.available_talk_time <= 60) {
                return "Account balance less than 1 min. Please recharge the account and try again";
            } else {
              console.log("inside call saving msg");
                const callObj = {
                    user: user._id,
                    from: userPhoneNumber,
                    custome_field: queryParameters.custom_field ? queryParameters.custom_field : null
                }
                await Call.create(callObj);
                return `welcome to Hello CA`;
            }
          }  
      
    } catch (err) {
      console.log("error while welcoming the user from call");
      return {status: 400, info: err.message};
    }
  }

  async function createLogUserCall(body) {
    console.log("createLogUserCall");
    try {
      await CallLog.create(body);
    } catch(err) {
      console.log("error while call logging");
      return {status: 400, info: err.message};
    }
  }

module.exports = {
    welcomeUser,
    createLogUserCall
}