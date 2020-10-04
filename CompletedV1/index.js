const express = require("express");
const path = require("path");
const cors = require("cors");
require("./modules/databaseConnect");

const app = express();

app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build"));
});

app.use(express.static("build"));
app.use(cors());
app.use(express.json());

const liftController = require("./controllers/liftsController");

app.use("/", liftController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("connected to port: " + PORT));
