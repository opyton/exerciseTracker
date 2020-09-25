const express = require("express");
const userModel = require("../models/userModel");

const router = express.Router();

router.get("/", (req, res) => {
  const userDb = new Promise((resolve, reject) => {
    const userCollection = userModel.find();
    userCollection ? resolve(userCollection) : reject("not found");
  });
  userDb
    .then((userCollection) => res.json(userCollection))
    .catch(() => res.status(404).json("usercollection not found"));
});

router.post("/register", (req, res) => {
  if (req.body.user && req.body.pswd) {
    let newId = 0;
    const maxId = new Promise((resolve, reject) => {
      const id = userModel.find({}).sort({ user_id: -1 }).limit(1);
      id ? resolve(id) : reject("no id");
    });

    maxId
      .then((id) => {
        newId = id[0].user_id;
      })
      .then(() => {
        const newObjPromise = new Promise((resolve, reject) => {
          const newObj = new userModel({
            user: req.body.user,
            pswd: req.body.pswd,
            user_id: newId + 1,
          });
          newObj ? resolve(newObj) : reject("err in register");
        });
        newObjPromise
          .then((newObj) => {
            newObj.save();
            res.json("saved");
          })
          .catch((err) => res.status(404).json(err));
      })
      .catch((msg) => console.log(msg));
  } else {
    res.send("error please enter a unique user and password");
  }
});

module.exports = router;
