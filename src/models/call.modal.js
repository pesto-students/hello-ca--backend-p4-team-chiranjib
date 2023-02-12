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
  "CallSid": String,
  "CallFrom": String,
  "CallTo": String,
  "CallStatus": String,
  "Direction": String,
  "ForwardedFrom": String,
  "Created": String,
  "DialCallDuration": String,
  "RecordingUrl": String,
  "StartTime": String,
  "EndTime": String,
  "DialCallStatus": String,
  "CallType": String,
  //lawyer number
  "DialWhomNumber": String,
  "ProcessStatus": String,
  "flow_id": String,
  "tenant_id": String,
  "From": String,
  "To": String,
  "RecordingAvailableBy": String,
  "CurrentTime": String,
  "OutgoingPhoneNumber": String,
  "Legs": [
    {
      "Number": String,
      "Type": String,
      "OnCallDuration": String,
      "CallerId": String,
      "CauseCode": String,
      "Cause": String
    }
  ]

}

// Compile model from schema
const Call = mongoose.model("Call", callSchema);
const CallLog = mongoose.model("CallLog", callLogSchema);

module.exports = {
  Call,
  CallLog
};