const Tour = require("../../models/tour.model");
const createError = require("../../helpers/errorCreator");
const mongoose = require("mongoose");

module.exports.getTours = async (req, res, next) => {
  try {
    let tours = await Tour.find(
      {
        deleted: false,
      },
      {
        _id: 1,
        code: 1,
        slug: 1,
        name: 1,
        destinations: 1,
        updatedAt: 1,
      }
    ).populate("destinations");

    // bỏ lộ trình và đánh giá và bản tiếng Anh
    tours = tours.map((tour) => ({
      _id: tour._id,
      code: tour.code,
      slug: tour.slug,
      name: tour.name,
      destinations: tour.destinations.map((d) => ({
        _id: d._id,
        slug: d.slug,
        name: d.name,
        type: d.type,
        region: d.region,
        continent: d.continent,
      })),
    }));

    return res.status(200).json({
      data: tours,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.createTour = async (req, res, next) => {
  try {
    const tour = await Tour.create(req.tour);

    return res.status(200).json({
      data: {
        _id: tour._id,
        name: tour.name,
        code: tour.code,
        slug: tour.slug,
        destinations: req.destinations,
      },
      message: "Thành công",
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(createError(error, 500, error.message));
    }
    return next(createError(error, 500));
  }
};

module.exports.updateTour = async (req, res, next) => {
  try {
    const foundTour = req.foundTour;
    const tour = req.tour;
    foundTour.set(tour);
    foundTour.en = tour.en;
    await foundTour.save();

    return res.status(200).json({
      data: {
        _id: foundTour._id,
        code: foundTour.code,
        slug: foundTour.slug,
        name: foundTour.name,
        destinations: req.destinations,
      },
      message: "Thành công",
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(createError(error, 500, error.message));
    }
    return next(createError(error, 500));
  }
};

module.exports.fetchSingleTour = async (req, res, next) => {
  try {
    let { tourCode } = req.params;

    const tour = await Tour.findOne({ code: tourCode, deleted: false });

    if (!tour) {
      return next(createError(new Error(""), 400, "Not Found"));
    }

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      data: {
        ...tour._doc,
        departureDates: tour._doc.departureDates.sort(
          (a, b) => new Date(a).getTime() - new Date(b).getTime()
        ),
        thumb: getUrl(tour.thumb),
        itinerary: tour.itinerary.map((it) => ({
          ...it._doc,
          images: it.images.map((img) => ({
            ...img._doc,
            url: getUrl(img.url),
          })),
        })),
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deleteTour = async (req, res, next) => {
  try {
    const tour = req.tour;
    tour.deleted = true;
    await tour.save();

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
