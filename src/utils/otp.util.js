

const sendOTP = function (template_id, mobile, authkey) {
  try {
    console.log(`https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=${mobile}&authkey=${authkey}`);
    return {status: 200, info: "OTP sent to user"};
  } catch (err) {
    console.error(`Error while sending SMS`, err.message);
    next(err);
    return { status: 400, info: "Error while sending SMS"};
  }
}

const verfifyOTP = function (otp, authkey, mobile) {
  try {
    console.log(`https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${authkey}&mobile=${mobile}`);
    return {status: 200, info: "User otp verified"};
  } catch (err) {
    console.error(`Error while verifing user's otp`, err.message);
    next(err);
    return { status: 400, info: "Error while verifing user's otp"};
  }
}

const resendOTP = function (authkey, type, mobile) {
  `https://api.msg91.com/api/v5/otp/retry?authkey=${authkey}&retrytype=${type}&mobile=${mobile}`
}

module.exports = {
  sendOTP,
  verfifyOTP,
  resendOTP
}
