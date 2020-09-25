const userModel = require("../models/userModel");

const getUserData = (req, res) => {
  const userDb = new Promise((resolve, reject) => {
    const userCollection = userModel.find();
    userCollection ? resolve(userCollection) : reject("not found");
  });
  userDb
    .then((userCollection) => res.json(userCollection))
    .catch(() => res.status(404).json("user_collection not found"));
};

const postNewUser = (req, res) => {
  let newId = 0;

  const getmaxIdPromise = new Promise((resolve, reject) => {
    const id = userModel.find({}).sort({ user_id: -1 }).limit(1);
    id ? resolve(id) : reject("no id");
  });

  getmaxIdPromise
    .then((id) => (newId = id[0].user_id))
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
};
