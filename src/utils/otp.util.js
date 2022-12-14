

const sendOTP = function (template_id, mobile, authkey) {
  `https://api.msg91.com/api/v5/otp?template_id=${template_id}&mobile=${mobile}&authkey=${authkey}`
}

const verfifyOTP = function (otp, authkey, mobile) {
  `https://api.msg91.com/api/v5/otp/verify?otp=${otp}&authkey=${authkey}&mobile=${mobile}`
}

const resendOTP = function (authkey, type, mobile) {
  `https://api.msg91.com/api/v5/otp/retry?authkey=${authkey}&retrytype=${type}&mobile=${mobile}`
}

module.exports = {
  sendOTP,
  verfifyOTP,
  resendOTP
}
