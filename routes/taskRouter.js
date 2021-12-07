var express = require("express");
var router = express.Router();
var task = require("../models/taskModel");
const tasks = require("../controllers/taskController");

router.route("/:id").get(async (req, res, next) => {
  try {
    const taskById = await task.findById(req.params.id);
    if (!taskById) {
      return res.status(404).json({ msg: "" });
    }
    res.status(200).json({
      status: "success",
      data: taskById,
    });
  } catch (error) {
    next(error);
  }
});

router.route("/").get(tasks.getAll);

router.route("/").post(tasks.createSingleTask);

router.route("/:id").delete(tasks.DeleteTask);

module.exports = router;
