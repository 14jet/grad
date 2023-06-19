const createError = require("../../helpers/errorCreator");
const Guide = require("../../models/guide.model");
const GuidesCategory = require("../../models/guides-category.model");

module.exports = async (req, res, next) => {
  try {
    const guide = JSON.parse(req.body.guide);
    const thumb = req.files?.thumb?.[0].path.split("/uploads/")[1];

    if (!thumb) {
      return next(createError(new Error(""), 400, "Missing thumb."));
    }

    const guideWithSameTitle = await Guide.findOne({
      title: guide.title,
    });
    if (guideWithSameTitle) {
      return next(createError(new Error(""), 400, "Tiêu đề đã tồn tại."));
    }

    const guideWithSameTitleEN = await Guide.findOne({
      "en.title": guide.en.title,
    });
    if (guideWithSameTitleEN) {
      return next(
        createError(new Error(""), 400, "Tiêu đề tiếng Anh đã tồn tại.")
      );
    }

    const guideWithSameSlug = await Guide.findOne({
      slug: guide.slug,
    });
    if (guideWithSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    const category = await GuidesCategory.findById(guide.category);
    if (!category) {
      return next(createError(new Error(""), 400, "Không tìm thấy danh mục."));
    }

    guide.thumb = thumb;
    req.guide = guide;
    req.category = category;
    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
