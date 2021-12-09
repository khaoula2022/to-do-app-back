//import mongoose from "mongoose";
const mongoose = require("mongoose");

const task = mongoose.Schema({
  label: String,
  description: String,
  //state: String,
  completed: {
    type: Boolean,
    default: false,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  //creator: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deadline: {
    type: Date,
  },
});
const tasks = mongoose.model("task", task);
module.exports = tasks;
