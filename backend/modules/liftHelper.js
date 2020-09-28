const liftModel = require("../models/liftModel");

const getLiftData = (req, res) => {
  const liftDb = new Promise((resolve, reject) => {
    const liftCollection = liftModel.find();
    liftCollection ? resolve(liftCollection) : reject("not found");
  });
  liftDb
    .then((liftCollection) => res.json(liftCollection))
    .catch(() => res.status(404).json("lift_collection not found"));
};

const postLiftData = (req, res) => {
  let liftObj = new liftModel();
  liftObj.type = req.body.type;
  liftObj.lift_amount = req.body.lift_amount;
  liftObj.user_id = req.body.user_id;
  liftObj.save((err) =>
    !err
      ? res.json("success! saved " + req.body.type)
      : res.json("error: " + err)
  );
};

module.exports = {
  getLiftData,
  postLiftData,
};
