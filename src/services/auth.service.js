const User = require('../models/user.model')
const otpHelper = require('../utils/otp.util');

async function register(body){
  // console.log("auth service User", User.create({...body}));
  try {
    const user = await User.create(body);
    if(!user) {
      return {status: 400, info: "User not found"};
    } else {
      return await otpHelper.sendOTP(process.env.SEND_OTP_TEMPLATE_ID, user.mobile, process.env.MSG_AUTH_KEY);
    }
  } catch (err) {
    console.log("error while reigstering the user");
    if(err.code === 11000) {
      return {status: 400, info: "User already registered"};
    }
    return {status: 400, info: err.message};
  }
}

async function verifyOtp(body) {
  console.log("service body", body);
  try {
    return await otpHelper.verfifyOTP(body.otp, process.env.MSG_AUTH_KEY, body.country_code + body.mobile);
  } catch (err) {
    console.log("error while reigstering the user");
    return {status: 400, info: err.message};
  }
}

async function login(body){
  try {
    const user = await User.findOne({mobile: body.mobile, country_code: body.country_code});
    if(!user) {
      return {status: 400, info: "User not found"};
    } else {
      return await otpHelper.sendOTP(process.env.SEND_OTP_TEMPLATE_ID, user.mobile, process.env.MSG_AUTH_KEY);
    }
  } catch (err) {
    console.log("error while fetching the user");
    return {status: 400, info: err.message};
  }
}

module.exports = {
  login,
  register,
  verifyOtp,
}
