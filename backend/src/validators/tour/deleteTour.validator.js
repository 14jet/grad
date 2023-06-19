const createError = require("../../helpers/errorCreator");
const Tour = require("../../models/tour.model");

module.exports = async (req, res, next) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return next(createError(new Error(""), 400, "Thiếu _id"));
    }

    const tour = await Tour.findById(_id);
    if (!tour) {
      return next(createError(new Error(""), 400, "Không tìm thấy tour"));
    }

    req.tour = tour;
    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
