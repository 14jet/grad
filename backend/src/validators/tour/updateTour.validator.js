const Tour = require("../../models/tour.model");
const Place = require("../../models/place.model");
const createError = require("../../helpers/errorCreator");

module.exports = async (req, res, next) => {
  try {
    const tour = JSON.parse(req.body.tour);
    if (!tour) {
      return next(createError(new Error(""), 400, "Missing tour."));
    }

    // check images
    tour.thumb =
      req.files?.thumb?.[0].path.split("/uploads/")[1] ||
      tour.thumb?.split("/images/")[1];
  
    const imageFiles = req.files?.images;
    const imageUrls = tour.itinerary.reduce(
      (acc, cur) => [...acc, ...cur.images],
      []
    );

    if (
      !tour.thumb ||
      ((!imageFiles || imageFiles.length === 0) && imageUrls.length === 0)
    ) {
      return next(
        createError(
          new Error(""),
          400,
          "Missing image: thumb or itinerary"
        )
      );
    }

    const foundTour = await Tour.findById(tour._id);
    if (!foundTour) {
      return next(createError(new Error(""), 400, "Không tìm thấy tour."));
    }

    // nếu đổi code và code mới đổi bị trùng
    const tourWithTheSameCode = await Tour.findOne({
      code: tour.code,
      _id: { $ne: tour._id },
    });
    if (tourWithTheSameCode) {
      return next(createError(new Error(""), 400, "Mã tour đã tồn tại."));
    }

    const toursWithTheSameName = await Tour.findOne({
      name: tour.name,
      _id: { $ne: tour._id },
    });

    if (toursWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên tour đã tồn tại."));
    }

    const toursWithTheSameSlug = await Tour.findOne({
      slug: tour.slug,
      _id: { $ne: tour._id },
    });

    if (toursWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    if (imageFiles) {
      imageFiles.forEach((item) => {
        tour.itinerary[item.itiIndex].images[item.imgIndex].url =
          item.path.split("/uploads/")[1];
        tour.en.itinerary[item.itiIndex].images[item.imgIndex].url =
          item.path.split("/uploads/")[1];
      });
    }

    tour.itinerary = tour.itinerary.map((it) => ({
      ...it,
      images: it.images.map((item) => ({
        ...item,
        url: item.url.startsWith("http")
          ? item.url.split("/images/")[1]
          : item.url,
      })),
    }));


    const destinations = await Place.find({
      _id: {
        $in: tour.destinations
      }
    })

    req.destinations = destinations;
    req.tour = tour;
    req.foundTour = foundTour;

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
