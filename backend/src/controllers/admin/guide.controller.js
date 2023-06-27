const Guide = require("../../models/guide.model");
const createError = require("../../helpers/errorCreator");
const {
  getBase64ImgsFromQuillDelta,
  saveBase64ImgsToDisk,
} = require("../../services/admin/guide.service");
const GuidesCategory = require("../../models/guides-category.model");
const mongoose = require("mongoose");

module.exports.fetchGuides = async (req, res, next) => {
  try {
    let guides = await Guide.find(
      {
        deleted: false,
      },
      { _id: 1, title: 1, category: 1, slug: 1 }
    ).populate("category");

    const category = await GuidesCategory.find({deleted: false});

    return res.status(200).json({
      data: guides,
      metadata: {
        category,
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.addGuide = async (req, res, next) => {
  try {
    let guideObject = req.guide;
    let guideString = JSON.stringify(guideObject);

    // lấy image base64 [ {base64String, caption }]
    let base64Imgs = getBase64ImgsFromQuillDelta(guideObject.content).concat(
      getBase64ImgsFromQuillDelta(guideObject.en.content)
    );

    // lưu vào ổ đĩa
    let imageUrls = await saveBase64ImgsToDisk(base64Imgs);

    // ráp urls vào bài viết
    base64Imgs.forEach((item, index) => {
      while (guideString.includes(item.base64String)) {
        guideString = guideString.replace(item.base64String, imageUrls[index]);
      }
    });

    const newGuide = await Guide.create(JSON.parse(guideString));

    return res.status(200).json({
      message: "Thành công",
      data: {
        _id: newGuide._id,
        slug: newGuide.slug,
        title: newGuide.title,
        category: req.category,
        createdAt: newGuide.createdAt,
        updatedAt: newGuide.updatedAt,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(createError(error, 400, error.message));
    }
    return next(createError(error, 500));
  }
};

module.exports.updateGuide = async (req, res, next) => {
  try {
    let guideObject = req.guide;
    let guideString = JSON.stringify(guideObject);
    let foundGuide = req.foundGuide;

    // handle: upload hình base64 mới trong content
    let base64Imgs = [
      ...getBase64ImgsFromQuillDelta(guideObject.content),
      ...getBase64ImgsFromQuillDelta(guideObject.en.content),
    ];

    let imageUrls = await saveBase64ImgsToDisk(base64Imgs);

    // ráp hình vào
    base64Imgs.forEach((item, index) => {
      while (guideString.includes(item.base64String)) {
        guideString = guideString.replace(item.base64String, imageUrls[index]);
      }
    });

    guideObject = JSON.parse(guideString);

    foundGuide.title = guideObject.title;
    foundGuide.content = {
      ops: guideObject.content.ops.map((item) => {
        const output = item;
        if (output.insert?.image?.src.startsWith("http")) {
          output.insert.image.src =
            output.insert.image.src.split("/images/")[1];
        }
        return output;
      }),
    };
    foundGuide.author = guideObject.author;
    foundGuide.origin = guideObject.origin;
    foundGuide.category = guideObject.category;
    foundGuide.thumb = guideObject.thumb;
    foundGuide.slug = guideObject.slug;
    foundGuide.en = {
      title: guideObject.en.title,
      content: {
        ops: guideObject.en.content.ops.map((item) => {
          const output = item;
          if (output.insert?.image?.src.startsWith("http")) {
            output.insert.image.src =
              output.insert.image.src.split("/images/")[1];
          }
          return output;
        }),
      },
    };
    await foundGuide.save();
    return res.status(200).json({
      message: "Thành công",
      data: {
        _id: foundGuide._id,
        title: foundGuide.title,
        category: req.category,
        slug: foundGuide.slug,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(createError(error, 400, error.message));
    }
    return next(createError(error, 500));
  }
};

module.exports.fetchSingleGuide = async (req, res, next) => {
  try {
    let { slug } = req.params;
    const guide = await Guide.findOne({ slug });

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      data: {
        _id: guide._id,
        author: guide.author,
        slug: guide.slug,
        title: guide.title,
        origin: guide.origin,
        category: guide.category,
        content: {
          ops: guide.content.ops.map((item) => {
            let output = item;
            if (output.insert.image?.src) {
              output.insert.image.src = getUrl(output.insert.image.src);
            }
            return output;
          }),
        },
        thumb: guide.thumb,
        en: {
          title: guide.en.title,
          content: {
            ops: guide.en.content.ops.map((item) => {
              let output = item;
              if (output.insert.image?.src) {
                output.insert.image.src = getUrl(output.insert.image.src);
              }
              return output;
            }),
          },
        },
      },
      // data: guide,
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deleteGuide = async (req, res, next) => {
  try {
    const guide = req.guide;
    guide.deleted = true;
    await guide.save();

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.addCategoryItem = async (req, res, next) => {
  try {
    const newCategoryItem = await GuidesCategory.create(req.body);

    return res.status(200).json({
      message: "Thành công",
      data: newCategoryItem,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(createError(error, 500, error.message));
    }
    return next(createError(error, 500));
  }
};

module.exports.updateCategoryItem = async (req, res, next) => {
  try {
    let categoryItem = req.categoryItem;
    categoryItem.name = req.body.name;
    categoryItem.slug = req.body.slug;
    categoryItem.en.name = req.body.en.name;

    await categoryItem.save();

    return res.status(200).json({
      message: "Thành công",
      data: categoryItem,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(createError(error, 500, error.message));
    }
    return next(createError(error, 500));
  }
};

module.exports.fetchCategory = async (req, res, next) => {
  try {
    const category = await GuidesCategory.find({ deleted: false });
    return res.status(200).json({
      data: category,
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deleteCategoryItem = async (req, res, next) => {
  try {
    category = req.category;

    category.deleted = true;
    await category.save();

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
