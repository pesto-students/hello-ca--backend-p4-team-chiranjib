const {getUserIdFromToken} = require('../utils/checkAuth');
const userService = require('../services/user.service');

async function get(req, res, next) {
  try {
    console.log("in get user");
      const token = await getUserIdFromToken(req, res, next);
      res.json(await userService.get(token));
  } catch (err) {
      console.error(`Error while getting user details`, err.message);
      next(err);
  }
}

async function update(req, res, next) {
  try {
    res.json(await userService.update(getUserIdFromToken, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  update
};
