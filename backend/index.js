const express = require("express");
const cors = require("cors");
require("./modules/databaseConnect");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(express.json());

const liftController = require("./controllers/liftsController");

app.use("/", liftController);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("connected to port: " + PORT));
