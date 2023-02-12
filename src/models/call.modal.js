// Require Mongoose
const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;

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
  ],
  "CustomField": String
}

// Compile model from schema
const CallLog = mongoose.model("CallLog", callLogSchema);

module.exports = {
  CallLog
};