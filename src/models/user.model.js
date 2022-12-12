// Require Mongoose
const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;


const usersSchema = new Schema({
    "first_name": String,
    "last_name": String,
    "country_code": Number,
    "phone_number": Number,
    "available_talk_time": Number,
    "member_registration_num": String,
    "user_type": {
        "type": String,
        "enum": ["User", "CA", "ADMIN"]
    },
    "is_verified": Boolean,
    "last_login": Date,
});


// Compile model from schema
const User = mongoose.model("User", usersSchema);