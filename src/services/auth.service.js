const User = require('../models/user.model')
const otpHelper = require('../utils/otp.util');

async function register(body){
  // console.log("auth service User", User.create({...body}));
  try {
    const user = await User.create(body);
    if(!user) {
      return {status: 400, info: "User not found"};
    } else {
      return await otpHelper.sendOTP(process.env.SEND_OTP_TEMPLATE_ID, user.mobile, process.env.AUTH_KEY);
    }
  } catch (err) {
    console.log("error while reigstering the user");
    if(err.code === 11000) {
      return {status: 400, info: "User already registered"};
    }
    return {status: 400, info: err.message};
  }
  
}

async function login(body){
  const result = {}

  return {message};
}

module.exports = {
  login,
  register
}
