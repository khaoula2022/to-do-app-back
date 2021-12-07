const task = require("../models/taskModel");
const base = require("./baseController");

exports.GetAllTasks = base.getAll(task);
exports.GetSingleTask = base.getOne(task);
//exports.CreateTask = base.createOne(task);
exports.DeleteTask = base.deleteOne(task);
exports.UpdateTask = base.updateOne(task);

exports.createSingleTask = async (req, res, next) => {
  try {
    const newTask = new task({
      label: req.body.label,
      description: req.body.description,
      createdAt: req.body.createdAt,
    });

    const doc = await newTask.save({ ...req.body });

    res.status(201).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const doc = await task.find();

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};
