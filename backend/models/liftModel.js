const mongoose = require("mongoose");

const liftSchema = mongoose.Schema({
  type: { type: String, required: true },
  user: { type: String },
  date: { type: Date },
  lift_amount: { type: Number, required: true },
  reps: { type: Number },
  sets: { type: Number },
  total: { type: Number },
});

module.exports = mongoose.model("lifts", liftSchema);
