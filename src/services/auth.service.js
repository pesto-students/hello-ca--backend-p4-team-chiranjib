const db = require('./db.service');
const { User } = require('../models')
const otpHelper = require('../utils/otp.util');
const config = require('../configs/general.config');

async function register(body){
  const user = await User.create(...body);
  if(!user) {
    return {status: 400, info: "Error in registering"};
  } else {
    otpHelper.sendOTP(process.env.SEND_OTP_TEMPLATE_ID, user.mobile, process.env.AUTH_KEY);
  }
}

async function login(programmingLanguage){
  const result = await db.query(
    `INSERT INTO programming_languages 
    (name, released_year, githut_rank, pypl_rank, tiobe_rank) 
    VALUES 
    (?, ?, ?, ?, ?)`, 
    [
      programmingLanguage.name, programmingLanguage.released_year,
      programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
      programmingLanguage.tiobe_rank
    ]
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}

module.exports = {
  login,
  register
}
