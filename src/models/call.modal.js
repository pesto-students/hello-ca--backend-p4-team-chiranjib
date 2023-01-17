// Require Mongoose
const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;


const callSchema = new Schema({
    "user": {
        "type": Schema.Types.ObjectId,
        "ref": "User"
    },
    "from": {
        "contact_uri": String,
        "state_management": String
    },
    "to": {
        "contact_uri": String
    },
    "virtual_number": String,
    "recording": {
        "record": String,
        "channels": String,
        "format": String
      },
    "wait_audio_url": String,
    "custom_field": String,
    "status_callback": [
        {
          "event": String,
          "url": String,
          "method": String,
          "content_type": String
        }
    ],
    "playback": [
        {
          "event": String,
          "to": String,
          "value": String
        }
    ],
    "streaming": {
        "url": String,
        "begin": String
      },
    "digit": { // preferred language
      type: String
    }
}, { timestamps: true });


const callLogSchema = {
  request_id: {
    type: String
  },
  method: {
    type: String
  },
  http_code: {
    type: Number
  },
  response: {
    code: {
      type: Number
    },
    status: {
      type: String
    },
    call_details: {
      sid: {
        type: String
      },
      direction: {
        type: String
      },
      virtual_number: {
        type: Number
      },
      state: {
        type: String
      },
      status: {
        type: String
      },
      legs: {
        type: String
      },
      created_time: Date,
      updated_time: Date,
      start_time: Date,
      end_time: Date,
      total_duration: {
        type: Number
      },
      total_talk_time: {
        type: Number
      },
      custom_field: {
        type: String
      },
      app_id: String,
      app_name: String,
      digits: String,
      recordings: String
    }
  }
}

// Compile model from schema
const Call = mongoose.model("Call", callSchema);
const CallLog = mongoose.model("CallLog", callLogSchema);

module.exports = {
  Call,
  CallLog
};