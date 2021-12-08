const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  birthdate: {
    type: Date,
    default: new Date(),
  },
  avatar: String,
  password: {
    type: String,
  },
  passwordConfirm: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
