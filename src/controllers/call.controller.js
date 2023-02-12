const callService = require('../services/call.service');

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
    res.json(await callService.createLogUserCall(req.body));
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


module.exports = {
    welcomeUser,
    createLogUserCall,
    getCaList
};
