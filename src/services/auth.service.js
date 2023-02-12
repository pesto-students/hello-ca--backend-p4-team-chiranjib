const User = require('../models/user.model');
const otpHelper = require('../utils/otp.util');
const jwt = require('jsonwebtoken');

async function register(body){
  // console.log("auth service User", User.create({...body}));
  try {
    const user = await User.create(body);
    if(!user) {
      return {status: 400, info: "User not found"};
    } else {
      return otpHelper.sendOTP(process.env.SEND_OTP_TEMPLATE_ID, user.mobile, process.env.MSG_AUTH_KEY);
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
    let user = await User.findOne({country_code: body.country_code, mobile: body.mobile});
    // console.log("user verify otp", user);
    if(!user) {
      return {status: 200, info: "User details not found"};
    } else {
      const response = otpHelper.verfifyOTP(body.otp, process.env.MSG_AUTH_KEY, body.country_code + body.mobile);
      if(response.status === 200) {
        // const updatedUser = await user.updateOne({mobile_verified: true}).save();
        user.mobile_verified = true;
        user.last_login = new Date();
        await user.save();
        console.log("updatedUser", user);
        const token = await getJWT(user._id, user.user_type);
        return {token: token, user: user};
      } else {
        console.log("response from verifying otp", response);
        next();
      }
    }
  } catch (err) {
    console.log("error while verifying OTP of the user");
    return {status: 400, info: err.message};
  }
}

async function login(body){
  try {
    const user = await User.findOne({mobile: body.mobile, country_code: body.country_code});
    if(!user) {
      return {status: 400, info: "User not found"};
    } else {
      return otpHelper.sendOTP(process.env.SEND_OTP_TEMPLATE_ID, user.mobile, process.env.MSG_AUTH_KEY);
    }
  } catch (err) {
    console.log("error while fetching the user");
    return {status: 400, info: err.message};
  }
}

async function getJWT(userId, userType) {
  const token = jwt.sign({
    user_id: userId,
    user_type: userType
  }, process.env.JWT_SIGN_KEY);
  return token;
}

module.exports = {
  login,
  register,
  verifyOtp,
}
