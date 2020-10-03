const express = require("express");
const liftHelper = require("../modules/liftHelper");

const router = express.Router();

router.get("/lifts", (req, res) => liftHelper.getLiftData(req, res));
router.get("/lifts/:id", (req, res) => liftHelper.getLiftDataById(req, res));
router.post("/lifts", (req, res) => liftHelper.postLiftData(req, res));
router.delete("/lifts/:id", (req, res) => liftHelper.deleteLiftData(req, res));
router.put("/lifts/:id", (req, res) => liftHelper.editLiftData(req, res));

module.exports = router;
