const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user: { type: String, required: true },
  pswd: { type: String, required: true },
  user_id: { type: Number, required: true },
});

module.exports = mongoose.model("users", userSchema);
