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
      }
}, { timestamps: true });


// Compile model from schema
const Call = mongoose.model("Call", callSchema);