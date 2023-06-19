const Tour = require("../../models/tour.model");
const Place = require("../../models/place.model");
const createError = require("../../helpers/errorCreator");

module.exports = async (req, res, next) => {
  try {
    const tour = JSON.parse(req.body.tour);
    if (!tour) {
      return next(createError(new Error(""), 400, "Missing tour."));
    }

    const tourWithTheSameCode = await Tour.findOne({
      code: tour.code.toLowerCase(),
    });
    if (tourWithTheSameCode) {
      return next(createError(new Error(""), 400, "Mã tour đã tồn tại."));
    }

    const tourWithTheSameName = await Tour.findOne({
      name: tour.name,
    });
    if (tourWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên tour đã tồn tại."));
    }

    const tourWithTheSameNameEN = await Tour.findOne({
      "en.name": tour.en.name,
    });
    if (tourWithTheSameNameEN) {
      return next(
        createError(new Error(""), 400, "Tên tour tiếng Anh đã tồn tại.")
      );
    }

    const tourWithTheSameSlug = await Tour.findOne({
      slug: tour.slug,
    });
    if (tourWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    const thumb = req.files?.thumb?.[0].path.split("/uploads/")[1];
    const images = req.files?.images;

    if (!thumb || !images || images.length === 0) {
      return next(
        createError(new Error(""), 400, "Missing images: thumb or itinerary")
      );
    }

    images.forEach((item) => {
      tour.itinerary[item.itiIndex].images[item.imgIndex].url =
        item.path.split("/uploads/")[1];
      tour.en.itinerary[item.itiIndex].images[item.imgIndex].url =
        item.path.split("/uploads/")[1];
    });

    const destinations = await Place.find({
      _id: {
        $in: tour.destinations,
      },
    });

    req.destinations = destinations;
    req.tour = tour;
    tour.thumb = thumb;

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
