const createError = require("../../helpers/errorCreator");
const Guide = require("../../models/guide.model");

module.exports = async (req, res, next) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      return next(createError(new Error(""), 400, "Thiếu id"));
    }

    const guide = await Guide.findById(_id);
    if (!guide) {
      return next(createError(new Error(""), 400, "Không tìm thấy guide"));
    }

    req.guide = guide;

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
