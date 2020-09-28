const userModel = require("../models/userModel");

const jwt = require("jsonwebtoken");

const jwtKey = "my_secret_key";
const jwtExpirySeconds = 300;

const generateJWT = (res, user) => {
  const token = jwt.sign({ user }, jwtKey, {
    algorithm: "HS256",
    expiresIn: jwtExpirySeconds,
  });
  console.log("token:", token);
  res.cookie("token", token, { maxAge: jwtExpirySeconds * 1000 });
  res.end();
};

const getUserData = (req, res) => {
  const userDb = new Promise((resolve, reject) => {
    const userCollection = userModel.find();
    userCollection ? resolve(userCollection) : reject("not found");
  });
  userDb
    .then((userCollection) => res.json(userCollection))
    .catch(() => res.status(404).json("user_collection not found"));
};

const verifyUser = (req, res) => {
  // Find user with requested email
  userModel.findOne({ user: req.body.user }, function (err, user) {
    if (user === null) {
      return res.status(400).send({
        message: "User not found.",
      });
    } else {
      if (user.validPassword(req.body.pswd)) {
        generateJWT(res, user);
        // return res.status(201).send({
        //   message: "User Logged In",
        // });
      } else {
        return res.status(400).send({
          message: "Wrong Password",
        });
      }
    }
  });
};

const postNewUser = (req, res) => {
  let newId = 0;

  const getmaxIdPromise = new Promise((resolve, reject) => {
    const id = userModel.find({}).sort({ user_id: -1 }).limit(1);
    id ? resolve(id) : reject("no id");
  });

  getmaxIdPromise
    .then((id) => (newId = id[0].user_id ? id[0].user_id : 0))
    .then(() => {
      const newObjPromise = new Promise((resolve, reject) => {
        let newObj = new userModel();

        newObj.user = req.body.user;
        newObj.setPassword(req.body.pswd);
        newObj.user_id = newId + 1;

        newObj ? resolve(newObj) : reject("err in register");
      });

      newObjPromise
        .then((newObj) => {
          console.log(newObj);
          newObj.save((err) => {
            if (err) res.status(404).json("error saving new user. " + err);
            else res.json("saved");
          });
        })
        .catch((err) => res.status(404).json("issue with promise " + err));
    })
    .catch((msg) => console.log(msg));
};

module.exports = {
  getUserData,
  postNewUser,
  verifyUser,
};
