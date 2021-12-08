const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please fill your username"],
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, " Please provide a valid email"],
  },
  birthdate: {
    type: Date,
    default: new Date(),
  },
  avatar: String,
  password: {
    type: String,
    minLength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Your password and confirmation password are not the same",
    },
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;