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
