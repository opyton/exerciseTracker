const express = require("express");
const cors = require("cors");
require("./modules/databaseConnect");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const jwtKey = "my_secret_key";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

const userController = require("./controllers/usersController");
const liftController = require("./controllers/liftsController");

app.use("/users", userController);
app.use("/lifts", liftController);
app.get("/", (req, res) => {
  if (!req.cookies) {
    return res.status(401).end();
  }
  const token = req.cookies.token;

  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
    console.log(payload);
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
  res.send(`Welcome ` + payload.user.user + "!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("connected to port: " + PORT));
