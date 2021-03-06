const express = require("express");
const userHelper = require("../modules/userHelper");

const router = express.Router();

router.get("/", (req, res) => userHelper.getUserData(req, res));

router.post("/register", (req, res) =>
  req.body.user && req.body.pswd
    ? userHelper.postNewUser(req, res)
    : res.json("error please enter a unique user and password")
);

router.post("/login", (req, res) =>
  req.body.user && req.body.pswd
    ? userHelper.verifyUser(req, res)
    : res.status(404).json("error please enter a correct user and password")
);

module.exports = router;
