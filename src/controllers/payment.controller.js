const {getUserIdFromToken} = require('../utils/checkAuth');
const paymentService = require('../services/payment.service');
const Razorpay = require('razorpay');
const crypto = require('crypto');

async function orders(req, res, next) {
  try {
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    //dummy payment data
    const options = {
      amount: 50000,
      currency: 'INR',
      receipt: 'receipt_1',
    };

    const order = await instance.orders.create(options);
    
    if (!order) return res.status(500).send('Some error occured');
    
    res.json(order);
  
  } catch (error) {
    res.status(500).send(error);
  }
}

async function success(req, res, next) {
  try {
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    const shaSum = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET);
    shaSum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shaSum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not valid' });

    const newPayment = PaymentDetails({
      razorpayDetails: {
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
      success: true,
    });

    await newPayment.save();

    res.json({
      msg: 'success',
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}

module.exports = {
  orders,
  success
};
