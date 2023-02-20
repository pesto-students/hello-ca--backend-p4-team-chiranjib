const dotenv =  require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
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
const { checkAuth } = require('./src/utils/checkAuth');
const axios = require('axios');
const FormData = require("form-data")
mongoose.set('strictQuery', true);

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
app.use('/user', checkAuth, userRouter);
app.use('/call', callRouter);
app.use('/payment', checkAuth, paymentRouter);


app.post("/start-call", async (req, res) => {
  try {
    var data = new FormData();
    data.append("From", req.body.mobile);
    data.append("CallerId", "01141133606");
    data.append("Url", "http://my.exotel.in/exoml/start/590426");
    data.append("CallType", "trans");
    data.append("TimeLimit", req.body.timeLimit);
    data.append(
      "StatusCallback",
      "https://9198-2401-4900-1c69-68d0-d9e0-5617-8db7-d764.in.ngrok.io/call/createLogUserCall"
    );
    data.append("CustomField", req.body.topics);

    axios
      .post(
        "https://api.exotel.com/v1/Accounts/sthambhalliances1/Calls/connect.json",
        data,
        {
          headers: {
            Authorization:
              "Basic MDBhNWE4OTk0NmYwZmZmODFhMjAwNGY1NzAxMTY2ZTViMjliMDE1NjQ1ZDI0NjIyOjA2YWU2ZTU0NmJmZDJjZjFjY2I5MGE4Y2FlYjZlMGY3ODZlMjc4MTkwYzczM2ZhOA==",
          },
          // auth: {
          //   username: "RTRIKXNG50AG6RF3OJGAVUWE",
          //   password: "_TK80jTQr7632CI6aMHsQfkf",
          // },
        }
      )
      .then((response) => {
        console.log("response:", response.data);
        if (response && response.status === 200) {
          res.send(response.data);
        } else {
          res.status(400).send({ message: "something went wrong" });
        }
      })
      .catch((error) => {
        console.log("error:", error);
        res.status(400).send({ message: "something went wrong" });
      });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "something went wrong" });
  }
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

mongoose.connect(process.env.MONGO_URL).then(
  () => {console.log("Mongo Connected Successfully")},
  (error) => {console.log("MongoDB connection error")}
);


app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
