const mongoose = require("mongoose");

const liftSchema = mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
  lift_amount: { type: Number, required: true },
  user_id: { type: Number, required: true },
});

module.exports = mongoose.model("lifts", liftSchema);
