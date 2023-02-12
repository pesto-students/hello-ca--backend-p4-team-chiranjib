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
    console.log("createLogUserCall", body);
    try {
      const userNumber = parseInt(body.CallFrom.substring(1));
      let user = await User.findOne({ mobile: userNumber });
      let available_talk_time = user.available_talk_time;
      console.log(userNumber, available_talk_time);
      if(available_talk_time >= 0) {
        const OnCallDuration = body.Legs[0].OnCallDuration;
        if (available_talk_time > OnCallDuration) available_talk_time -= OnCallDuration;
        else available_talk_time = 0;
      }
      user.available_talk_time = available_talk_time;
      await user.save();
      await CallLog.create(body);
    } catch(err) {
      console.log("error while call logging");
      return {status: 400, info: err.message};
    }
  }

  async function getCaList() {
    console.log("in getCA list call service");
    try {
        const agent = await User.find({user_type: 'CA', is_online: true, profile_verified: true}, {"_id": 0, "mobile": 1, "country_code": 1});
        let numbersList = [];
        if (agent && agent.length !== 0) {
            for(let i = 0; i < agent.length; i++) {
              numbersList.push('+' + (agent[i].country_code).toString() + (agent[i].mobile).toString());
            }
        } else {
          numbersList = [];
        }
        
        let resObj = {
          fetch_after_attempt: false,
          destination: {
            numbers: numbersList,
          },
          record: true,
          recording_channels: 'dual',
          max_ringing_duration: 15,
        }
        console.log(resObj);
        return resObj;  
    } catch(err) {
        console.log("error in list of CAs", err.message);
        return { status: 400, info: err.message};
    }
}

async function getCallLogsForCA(user_id, mobile) {
  try {
    const agentNumberString = "0" + mobile;
    console.log(user_id, agentNumberString);
    const callLogs = await CallLog.find({ DialWhomNumber: agentNumberString }, {'created': 1, 'RecordingUrl': 1, 'Legs': 1, 'CustomField': 1});
    return { status: 200, callLogs: callLogs };
  } catch(err) {
    console.log("error while fetching call logs for CA");
    return {status: 400, info: err.message};
  }
}

async function getCallLogsForUser(user_id, mobile) {
  try {
    const userNumberString = "0" + mobile;
    console.log(user_id, userNumberString);
    const callLogs = await CallLog.find({ CallFrom: userNumberString }, {'created': 1, 'RecordingUrl': 1, 'Legs': 1, 'CustomField': 1});
    return { status: 200, callLogs: callLogs };
  } catch(err) {
    console.log("error while fetching call logs for CA");
    return {status: 400, info: err.message};
  }
}

module.exports = {
    welcomeUser,
    createLogUserCall,
    getCaList,
    getCallLogsForCA,
    getCallLogsForUser
}