const mongoose = require("mongoose");

const task = mongoose.Schema({
  label: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deadline: {
    type: Date,
    min: Date.now(),
  },
});
const tasks = mongoose.model("task", task);
module.exports = tasks;
