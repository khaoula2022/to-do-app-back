const task = require("../models/taskModel");
const base = require("./baseController");

exports.GetAllTasks = base.getAll(task);
exports.GetSingleTask = base.getOne(task);
//exports.CreateTask = base.createOne(task);
exports.DeleteTask = base.deleteOne(task);
exports.UpdateTask = base.updateOne(task);

exports.createSingleTask = async (req, res, next) => {
  try {
    const user = req.user;

    const newTask = new task({
      label: req.body.label,
      description: req.body.description,
      createdAt: req.body.createdAt,
      deadline: req.body.deadline,
    });

    const doc = await newTask.save({ ...req.body, creator: user });
    console.log(doc);
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
    const user = req.user;

    const doc = await task
      .find({
        creator: user,
      })
      .sort({ _id: -1 })
      .populate("creator");

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};
