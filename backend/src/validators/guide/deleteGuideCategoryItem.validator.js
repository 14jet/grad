const createError = require("../../helpers/errorCreator");
const GuidesCategory = require("../../models/guides-category.model");
const Guide = require("../../models/guide.model");

module.exports = async (req, res, next) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return next(createError(new Error(""), 400, "Thiếu _id."));
    }

    if (typeof _id !== "string") {
      return next(createError(new Error(""), 400, "_id phải là chuỗi."));
    }

    const guideIsUsingThisCategory = await Guide.findOne({ category: _id });

    if (guideIsUsingThisCategory) {
      return next(
        createError(new Error(""), 400, "Danh mục này đang được sử dụng.")
      );
    }

    const categoryItem = await GuidesCategory.findById(_id);
    if (!categoryItem) {
      return next(createError(new Error(""), 400, "Không tìm thấy danh mục."));
    }

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
