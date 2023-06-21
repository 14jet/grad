const createError = require("../../helpers/errorCreator");
const Guide = require("../../models/guide.model");

module.exports.getGuides = async (req, res, next) => {
  try {
    const lang = req.lang;

    let guides = [];
    if (lang === "vi") {
      guides = await Guide.aggregate([
        {
          $match: {
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "guidecategories",
            foreignField: "_id",
            localField: "category",
            as: "category",
            pipeline: [
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            category: {
              $arrayElemAt: ["$category", 0],
            },
          },
        },
        {
          $project: {
            en: 0,
            content: 0,
            author: 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
    }

    if (lang === "en") {
      guides = await Guide.aggregate([
        {
          $match: {
            deleted: false,
          },
        },
        {
          $lookup: {
            from: "guidecategories",
            localField: "category",
            foreignField: "_id",
            as: "category",
            pipeline: [
              {
                $set: {
                  name: "$en.name",
                },
              },
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            category: { $arrayElemAt: ["$category", 0] },
            title: "$en.title",
          },
        },
        {
          $project: {
            en: 0,
            content: 0,
            author: 0,
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
      ]);
    }

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      data: guides.map((guide) => ({
        _id: guide.id,
        title: guide.title,
        category: guide.category,
        slug: guide.slug,
        thumb: getUrl(guide.thumb),
      })),
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getSingleGuide = async (req, res, next) => {
  try {
    const lang = req.lang;

    const { slug } = req.params;
    let guide;
    if (lang === "vi") {
      guide = await Guide.aggregate([
        {
          $match: {
            slug,
            deleted: false,
          },
        },
        {
          $lookup: {
            foreignField: "_id",
            localField: "category",
            from: "guidecategories",
            as: "category",
            pipeline: [
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            category: {
              $arrayElemAt: ["$category", 0],
            },
          },
        },
        {
          $project: {
            en: 0,
          },
        },
      ]);
    }

    if (lang === "en") {
      guide = await Guide.aggregate([
        {
          $match: {
            slug,
            deleted: false,
          },
        },
        {
          $lookup: {
            foreignField: "_id",
            localField: "category",
            from: "guidecategories",
            as: "category",
            pipeline: [
              {
                $set: {
                  name: "$en.name",
                },
              },
              {
                $project: {
                  en: 0,
                },
              },
            ],
          },
        },
        {
          $set: {
            title: "$en.title",
            content: "$en.content",
            category: {
              $arrayElemAt: ["$category", 0],
            },
          },
        },
        {
          $project: {
            en: 0,
          },
        },
      ]);
    }

    if (!guide[0]) {
      return next(
        createError(new Error(""), 404, {
          vi: "Không tìm thấy bài viết",
          en: "Not Found",
        })
      );
    }

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      data: {
        _id: guide[0]._id,
        title: guide[0].title,
        slug: guide[0].slug,
        thumb: guide[0].thumb,
        author: guide[0].author,
        content: {
          ops: guide[0].content.ops.map((item) => {
            let output = item;
            if (output.insert?.image?.src) {
              output.insert.image.src = getUrl(output.insert.image.src);
            }
            return output;
          }),
        },
        category: guide[0].category,
        createdAt: guide[0].createdAt,
        updatedAt: guide[0].updatedAt,
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
