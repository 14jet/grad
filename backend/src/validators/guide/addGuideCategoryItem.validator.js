const { string, object } = require("yup");
const createError = require("../../helpers/errorCreator");
const GuidesCategory = require("../../models/guides-category.model");

module.exports = async (req, res, next) => {
  try {
    const guidesCategorySchema = object({
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

    const categoryItemWithTheSameName = await GuidesCategory.find({
      name: req.body.name,
    });
    if (!categoryItemWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên danh mục đã tồn tại."));
    }

    const categoryItemWithTheSameNameEN = await GuidesCategory.find({
      "en.name": req.body.en.name,
    });
    if (!categoryItemWithTheSameNameEN) {
      return next(
        createError(new Error(""), 400, "Tên danh mục tiếng Anh đã tồn tại.")
      );
    }

    const categoryItemWithTheSameSlug = await GuidesCategory.find({
      slug: req.body.slug,
    });
    if (!categoryItemWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
