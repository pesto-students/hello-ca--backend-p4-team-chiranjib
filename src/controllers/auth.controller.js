const authService = require('../services/auth.service');

// async function get(req, res, next) {
//   try {
//       res.json(await programmingLanguages.getMultiple(req.query.page));
//   } catch (err) {
//       console.error(`Error while getting programming languages`, err.message);
//       next(err);
//   }
// }

async function register(req, res, next) {
  try {
    res.json(await authService.register(req.body));
  } catch (err) {
    console.error(`Error while login`, err.message);
    next(err);
  }
}

async function login(req, res, next) {
  try {
    res.json(await authService.create(req.body));
  } catch (err) {
    console.error(`Error while registering`, err.message);
    next(err);
  }
}

// async function update(req, res, next) {
//   try {
//     res.json(await programmingLanguages.update(req.params.id, req.body));
//   } catch (err) {
//     console.error(`Error while updating programming language`, err.message);
//     next(err);
//   }
// }

// async function remove(req, res, next) {
//   try {
//     res.json(await programmingLanguages.remove(req.params.id));
//   } catch (err) {
//     console.error(`Error while deleting programming language`, err.message);
//     next(err);
//   }
// }

module.exports = {
  login,
  register
};
