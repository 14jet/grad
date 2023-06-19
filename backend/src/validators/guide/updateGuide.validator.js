const createError = require("../../helpers/errorCreator");
const Guide = require("../../models/guide.model");
const GuidesCategory = require("../../models/guides-category.model");

module.exports = async (req, res, next) => {
  try {
    const guide = JSON.parse(req.body.guide);
    const thumb =
      req.files?.thumb?.[0].path.split("/uploads/")[1] ||
      guide.thumb?.split("/images/")[1];

    const foundGuide = await Guide.findById(guide._id);
    if (!foundGuide) {
      return next(createError(new Error(""), 400, "Không tìm thấy guide"));
    }

    const guideWithTheSameTitle = await Guide.findOne({
      title: guide.title,
      _id: {
        $ne: guide._id,
      },
    });
    if (guideWithTheSameTitle) {
      return next(createError(new Error(""), 400, "Tiêu đề  đã tồn tại."));
    }

    const guideWithTheSameTitleEN = await Guide.findOne({
      "en.title": guide.en.title,
      _id: {
        $ne: guide._id,
      },
    });
    if (guideWithTheSameTitleEN) {
      return next(
        createError(new Error(""), 400, "Tiêu đề  tiếng Anh đã tồn tại.")
      );
    }

    const guideWithTheSameSlug = await Guide.findOne({
      slug: guide.slug,
      _id: {
        $ne: guide._id,
      },
    });
    if (guideWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    const category = await GuidesCategory.findById(guide.category);
    if (!category) {
      return next(createError(new Error(""), 400, "Không tìm thấy danh mục."));
    }

    guide.thumb = thumb;
    req.guide = guide;
    req.foundGuide = foundGuide;
    req.category = category;
    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
