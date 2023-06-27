const createError = require("../../helpers/errorCreator");
const Visa = require("../../models/visa.model");
const Place = require("../../models/place.model");

module.exports = async (req, res, next) => {
  try {
    const foundVisa = await Visa.findById(req.body._id);
    if (!foundVisa) {
      return next(createError(new Error(""), 400, "Không tìm thấy visa"));
    }

    const visaWithTheSameName = await Visa.findOne({
      name: req.body.name,deleted: false,
      _id: {
        $ne: req.body._id,
      },
    });
    if (visaWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên visa đã tồn tại"));
    }

    const visaWithTheSameNameEN = await Visa.findOne({
      "en.name": req.body.en.name,deleted: false,
      _id: {
        $ne: req.body._id,
      },
    });
    if (visaWithTheSameNameEN) {
      return next(
        createError(new Error(""), 400, "Tên visa tiếng Anh đã tồn tại")
      );
    }

    const visaWithTheSameSlug = await Visa.findOne({
      slug: req.body.slug,deleted: false,
      _id: {
        $ne: req.body._id,
      },
    });
    if (visaWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại"));
    }

    const country = await Place.findOne({
      _id: req.body.country,
    });

    if (!country) {
      return next(createError(new Error(""), 400, "Không tìm thấy nước"));
    }

    if (country.type !== "country") {
      return next(createError(new Error(""), 400, "Nước không hợp lệ"));
    }

    req.country = country;
    req.visa = foundVisa;

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
