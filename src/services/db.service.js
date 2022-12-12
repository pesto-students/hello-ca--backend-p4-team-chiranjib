const env = process.env;
const mongoose = require('mongoose');

mongoose.connect(env.MONGO_URL).then(
  () => {console.log("Mongo Connected Successfully")},
  (error) => {console.log("MongoDB connection error")}
);
const db = mongoose.connection;

module.exports = {
  db
}
