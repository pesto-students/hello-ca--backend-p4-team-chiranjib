const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const checkAuth = (req, res, next) => {
    console.log("checkAuth");
    try {
        console.log(req.rawHeaders[1].split(" ")[1]);
        const token = req.rawHeaders[1].split(" ")[1];
        jwt.verify(token, process.env.JWT_SIGN_KEY);
        next();
    } catch(err) {
        // res.status(400).json({info: "User is not authenticated"});
        next(err);
    }
}

const getUserIdFromToken = (req, res, next) => {
    try {
        const token = req.rawHeaders[1].split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SIGN_KEY);
        console.log(decodedToken.user_id);
        return mongoose.Types.ObjectId(decodedToken.user_id);
    } catch(err) {
        // res.status(400).json({info: "Error fetching token from header"});
        next(err);
    }
}

module.exports = {
    checkAuth,
    getUserIdFromToken
};