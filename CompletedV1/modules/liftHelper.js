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

const getLiftDataById = (req, res) => {
  const liftDb = new Promise((resolve, reject) => {
    const liftCollection = liftModel.findById(req.params.id);
    liftCollection ? resolve(liftCollection) : reject("not found");
  });
  liftDb
    .then((liftCollection) => res.json(liftCollection))
    .catch(() => res.status(404).json("lift_collection not found"));
};

const postLiftData = (req, res) => {
  console.log(req.body);
  const liftObjProm = new Promise((resolve, reject) => {
    const liftObj = new liftModel({
      type: req.body.type,
      user: req.body.user,
      lift_amount: req.body.lift_amount,
      date: req.body.date,
      reps: req.body.reps,
      sets: req.body.sets,
      total:
        parseInt(req.body.reps) *
        parseInt(req.body.sets) *
        parseInt(req.body.lift_amount),
    });
    liftObj ? resolve(liftObj) : reject("incompatable object");
  });
  liftObjProm.then((liftObj) => {
    console.log(liftObj);
    liftObj.save();
    res.send("success!");
  });
};

const deleteLiftData = (req, res) => {
  liftModel.findByIdAndDelete(req.params.id, (err, docs) => {
    err ? console.log(err) : console.log("deleted " + docs);
  });
};

const editLiftData = (req, res) => {
  console.log(req.body);
  liftModel.findByIdAndUpdate(
    req.params.id,
    {
      user: req.body.user,
      date: req.body.date,
      lift_amount: req.body.lift_amount,
      type: req.body.type,
      reps: req.body.reps,
      sets: req.body.sets,
      total:
        parseInt(req.body.reps) *
        parseInt(req.body.sets) *
        parseInt(req.body.lift_amount),
    },
    (err) => (!err ? console.log("success") : console.log(err))
  );
};

module.exports = {
  getLiftData,
  getLiftDataById,
  postLiftData,
  deleteLiftData,
  editLiftData,
};
