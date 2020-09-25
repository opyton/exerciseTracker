const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  user: { type: String, required: true, unique: true },
  // pswd: { type: String, required: true },
  user_id: { type: Number, required: true, unique: true },
  hash: String,
  salt: String,
});

//https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
userSchema.methods.setPassword = function (pswd) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(pswd, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

userSchema.methods.validPassword = function (pswd) {
  const hash = crypto
    .pbkdf2Sync(pswd, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model("users", userSchema);
