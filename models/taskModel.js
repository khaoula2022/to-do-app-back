import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
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
