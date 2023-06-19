const { string, object } = require("yup");
const createError = require("../../helpers/errorCreator");
const GuidesCategory = require("../../models/guides-category.model");

module.exports = async (req, res, next) => {
  try {
    const guidesCategorySchema = object({
      _id: string().typeError("_id phải là chuỗi").required("Thiếu _id"),
      name: string()
        .typeError("Tên danh mục phải là chuỗi")
        .required("Thiếu tên danh mục"),
      slug: string("Slug phải là chuỗi").required("Thiếu slug"),
      en: object({
        name: string()
          .typeError("Tên danh mục phải là chuỗi")
          .required("Bản tiếng Anh: Thiếu tên danh mục"),
      }),
    }).required("Thiếu bản tiếng Anh");

    try {
      await guidesCategorySchema.validate(req.body);
    } catch (error) {
      return next(createError(new Error(""), 400, error.message));
    }

    const foundCategoryItem = await GuidesCategory.findById(req.body._id);
    if (!foundCategoryItem) {
      return next(createError(new Error(""), 400, "Không tìm thấy danh mục."));
    }

    const categoryItemWithTheSameName = await GuidesCategory.findOne({
      name: req.body.name,
    });
    if (categoryItemWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên danh mục đã tồn tại."));
    }

    const categoryItemWithTheSameNameEN = await GuidesCategory.findOne({
      "en.name": req.body.en.name,
    });
    if (categoryItemWithTheSameNameEN) {
      return next(createError(new Error(""), 400, "Tên danh mục đã tồn tại."));
    }

    const categoryItemWithTheSameSlug = await GuidesCategory.findOne({
      slug: req.body.slug,
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
