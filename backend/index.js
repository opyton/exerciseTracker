const express = require("express");
const cors = require("cors");
const userController = require("./controllers/usersController");
const liftController = require("./controllers/liftsController");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userController);
app.use("/lifts", liftController);
app.use("/", (req, res) => res.send("in root"));

const PORT = 4000;
app.listen(PORT, () => console.log("connected to port: " + PORT));
