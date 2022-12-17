const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        const token = req.header.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SIGN_KEY);
        next();
    } catch(err) {
        res.status(400).json({info: "User is not authenticated"});
    }
}

module.exports = checkAuth;