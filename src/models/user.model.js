const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const topics = require('../enums/topics.enum');


function getTopicsList() {
    const topicsList = [];
    for(const [key, value] of Object.entries(topics)) {
        console.log(key, value);
        topicsList.push(key);
    }
    return topicsList;
}

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String
    },
    country_code: {
        type: Number,
        required: true,
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
    member_registration_number: {
        type: String
    },
    user_type: {
        type: String,
        enum: ["USER", "CA", "ADMIN"],
        required: true
    },
    profile_verified: {
        type: Boolean,
        default: false
    },
    mobile_verified: {
        type: Boolean,
        default: false
    },
    specialization: {
        type: String,
        enum: getTopicsList(),
    },
    last_selected_topic: {
        type: String
    },
    last_login: Date,
}, { timestamps: true });


// Compile model from schema
const User = mongoose.model("User", userSchema);

module.exports = User;