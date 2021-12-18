var express = require("express");
var router = express.Router();
var task = require("../models/taskModel");
const tasks = require("../controllers/taskController");
const auth = require("../middleware/authMiddleware");

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

//router.route("/").get(tasks.getAll);
router.get("/", auth, tasks.getAll);
router.post("/", auth, tasks.createSingleTask);

//router.route("/").post(tasks.createSingleTask);

router
  .route("/:id")
  .delete(auth, tasks.DeleteTask)
  .patch(auth, tasks.UpdateTask)
  .get(auth, tasks.GetSingleTask);

router.route("/sort").get(async (req, res, next) => {
  try {
    const doc = await task.find().sort({ label: -1 });

    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});

router.route("/search/:search").get(async (req, res, next) => {
  try {
    const { search } = req.params;
    const doc = await task.find({
      $or: [{ label: { $regex: search, $options: "i" } }],
    });
    res.status(200).json(doc);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
