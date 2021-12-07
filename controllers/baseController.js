exports.getAll = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.find().sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      results: doc.length,
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findById(req.params.id);

    if (!doc) {
      return next(
        new AppError(404, "fail", "Please try to enter valid data"),
        req,
        res,
        next
      );
    }

    res.status(200).json({
      status: "success",
      data: doc,
    });
  } catch (error) {
    next(error);
  }
};
