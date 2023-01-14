// Require Mongoose
const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;


const paymentSchema = new Schema({
    "user": {
        "type": Schema.Types.ObjectId,
        "ref": "User"
    },
    "amount": {
        type: Number,
        required: true
    },
    "tax": {
        type: Number,
        required: true
    },
    "minutes_purchased": {
        type: Number
    },
    // status sent by frontend client
    "status_client": {
        type: Boolean,
        required: true
    },
    //status by payment partner api
    "status_api": {
        type: Boolean
    }
}, { timestamps: true });


// Compile model from schema
const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;