const createError = require("../../helpers/errorCreator");
const GuidesCategory = require("../../models/guides-category.model");

module.exports = async (req, res, next) => {
  try {

    const categoryItemWithTheSameName = await GuidesCategory.find({
      name: req.body.name,deleted: false
    });
    if (!categoryItemWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên danh mục đã tồn tại."));
    }

    const categoryItemWithTheSameNameEN = await GuidesCategory.find({
      "en.name": req.body.en.name,deleted: false
    });
    if (!categoryItemWithTheSameNameEN) {
      return next(
        createError(new Error(""), 400, "Tên danh mục tiếng Anh đã tồn tại.")
      );
    }

    const categoryItemWithTheSameSlug = await GuidesCategory.find({
      slug: req.body.slug,deleted: false
    });
    
    if (!categoryItemWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
