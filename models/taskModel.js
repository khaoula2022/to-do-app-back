//import mongoose from "mongoose";
const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

const task = mongoose.Schema({
  label: String,
  description: String,
  //state: String,
  completed: {
    type: Boolean,
    default: false,
  },
  creator: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const tasks = mongoose.model("task", task);
module.exports = tasks;
