const callService = require('../services/call.service');
const {getUserIdFromToken} = require('../utils/checkAuth');
const User = require('../models/user.model');


async function welcomeUser(req, res, next) {
  try {
    console.log("welcome user", req.query);
    res.json(await callService.welcomeUser(req.query));
  } catch (err) {
      console.error(`Error while fetching welcome message`, err.message);
      next(err);
  }
}

async function createLogUserCall(req, res, next) {
  try {
    res.json(await callService.createLogUserCall(req.query));
  } catch (err) {
    console.error(`Error while creating call logs`, err.message);
    next(err);
  }
}

async function getCaList(req, res, next) {
  console.log("in call controller getCAlist");
  try {
    res.json(await callService.getCaList());
  } catch(err) {
    console.error(`Error while getting CA List`, err.message);
    next(err);
  }
}

async function getCallLogsForCA(req, res, next) {
  try {
    const user_id = await getUserIdFromToken(req, res, next);
    const { mobile } = await User.findOne({ _id: user_id });
    res.json(await callService.getCallLogsForCA(user_id, mobile));
  } catch(err) {
    console.error(`Error while getting call logs for CA`, err.message);
    next(err);
  }
}

async function getCallLogsForUser(req, res, next) {
  try {
    const user_id = await getUserIdFromToken(req, res, next);
    const { mobile } = await User.findOne({ _id: user_id });
    res.json(await callService.getCallLogsForUser(user_id, mobile));
  } catch(err) {
    console.error(`Error while getting call logs for User`, err.message);
    next(err);
  }
}

module.exports = {
    welcomeUser,
    createLogUserCall,
    getCaList,
    getCallLogsForCA,
    getCallLogsForUser
};
