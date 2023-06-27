const createError = require("../../helpers/errorCreator");
const GuidesCategory = require("../../models/guides-category.model");

module.exports = async (req, res, next) => {
  try {

    const foundCategoryItem = await GuidesCategory.findById(req.body._id);
    if (!foundCategoryItem) {
      return next(createError(new Error(""), 400, "Không tìm thấy danh mục."));
    }

    const categoryItemWithTheSameName = await GuidesCategory.findOne({
      name: req.body.name, deleted: false,
      _id: {
        $ne: req.body._id
      }
    });
    if (categoryItemWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên danh mục đã tồn tại."));
    }

    const categoryItemWithTheSameNameEN = await GuidesCategory.findOne({
      "en.name": req.body.en.name,deleted: false,
      _id: {
        $ne: req.body._id
      }
    });
    if (categoryItemWithTheSameNameEN) {
      return next(createError(new Error(""), 400, "Tên danh mục đã tồn tại."));
    }

    const categoryItemWithTheSameSlug = await GuidesCategory.findOne({
      slug: req.body.slug,deleted: false,
      _id: {
        $ne: req.body._id
      }
    });
    if (categoryItemWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    req.categoryItem = foundCategoryItem;
    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
