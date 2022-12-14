const { User } = require('./user.model');
const { Call } = require('./call.modal');
const { Payment } = require('./payment.modal');

const Model = {
    "UserModal": User,
    "CallModal": Call,
    "PaymentModal": Payment
}

module.exports = Model;