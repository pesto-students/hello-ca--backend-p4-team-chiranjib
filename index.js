const dotenv =  require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require("helmet");
const app = express();
const port = process.env.PORT || 3000;
const authRouter = require('./src/routes/auth.route');
const userRouter = require('./src/routes/user.route');
const callRouter = require('./src/routes/call.route');
const paymentRouter = require('./src/routes/payment.route');

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(helmet());
app.use(morgan());

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/call', callRouter);
app.use('/payment', paymentRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
