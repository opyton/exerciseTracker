const mongoose = require("mongoose");

const mongoConnection = new Promise((resolve, reject) => {
  //alternate opyton:typotypo
  const mongoDB_user = "user";
  const mongoDB_pswd = "1TxXKyIQ487W5ys1";
  const mongoDB_URI =
    "mongodb+srv://" +
    mongoDB_user +
    ":" +
    mongoDB_pswd +
    "@cluster0.mnxzn.mongodb.net/test";
  mongoDB_URI ? resolve(mongoDB_URI) : reject("error: invalid uri");
});

mongoConnection
  .then((url) =>
    mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      (err) => (err ? console.log(err) : console.log("connected to database"))
    )
  )
  .catch((msg) => console.log(msg));

module.exports = mongoConnection;
