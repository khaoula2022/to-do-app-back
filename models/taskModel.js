import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  label: String,
  description: String,
  state: String,
  creator: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
