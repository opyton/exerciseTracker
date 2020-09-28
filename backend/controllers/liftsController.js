const express = require("express");
const liftHelper = require("../modules/liftHelper");

const router = express.Router();

router.get("/", (req, res) => liftHelper.getLiftData(req, res));
router.post("/tracker", (req, res) => liftHelper.postLiftData(req, res));

module.exports = router;
