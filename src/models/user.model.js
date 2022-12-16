const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    country_code: {
        type: Number,
        default: 91
    },
    mobile: {
        type: Number,
        required: true,
        unique: true
    },
    available_talk_time: {
        type: Number,
        default: 0
    },
    member_registration_number: String,
    user_type: {
        type: String,
        enum: ["User", "CA", "ADMIN"]
    },
    profile_verified: {
        type: Boolean,
        default: false
    },
    mobile_verified: {
        type: Boolean,
        default: false
    },
    last_login: Date,
});


// Compile model from schema
const User = mongoose.model("User", userSchema);

module.exports = User;