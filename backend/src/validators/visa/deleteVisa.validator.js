const createError = require("../../helpers/errorCreator");
const Visa = require("../../models/visa.model");

module.exports = async (req, res, next) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return next(createError(new Error(""), 400, "Thiếu id."));
    }

    if (typeof _id !== "string") {
      return next(createError(new Error(""), 400, "id phải là chuỗi."));
    }

    const visa = await Visa.findById(_id);
    if (!visa) {
      return next(createError(new Error(""), 400, "Không tìm thấy visa."));
    }

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
