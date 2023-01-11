const {getUserIdFromToken} = require('../utils/checkAuth');
const userService = require('../services/user.service');
const topics = require('../enums/topics.enum')

async function get(req, res, next) {
  try {
    console.log("in get user");
      const user_id = await getUserIdFromToken(req, res, next);
      res.json(await userService.get(user_id));
  } catch (err) {
      console.error(`Error while getting user details`, err.message);
      next(err);
  }
}

async function update(req, res, next) {
  try {
    const user_id = await getUserIdFromToken(req, res, next);
    res.json(await userService.update(user_id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
}

async function getTopics(req, res, next) {
  try {
    res.json({status: 200, topics: topics});
  } catch(err) {
    console.error(`Error while get topics`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  update,
  getTopics
};
