// Require Mongoose
const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;


const paymentSchema = new Schema({
    "user": {
        "type": Schema.Types.ObjectId,
        "ref": "User"
    },
    "amount": Number,
    "tax": Number,
    "minutes_purchased": Number,
    "status": Boolean,
    // status sent by frontend client
    "status_client": Boolean,
    //status by payment partner api
    "status_api": Boolean
}, { timestamps: true });


// Compile model from schema
const Payment = mongoose.model("Payment", paymentSchema);