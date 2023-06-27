const createError = require("../../helpers/errorCreator");
const Place = require("../../models/place.model");
const Tour = require("../../models/tour.model");
const Visa = require("../../models/visa.model");
const mongoose = require("mongoose");

module.exports.addPlace = async (req, res, next) => {
  try {
    const place = req.place;

    const createdPlace = await Place.create(place);

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      message: "Thành công",
      data: {
        _id: createdPlace._id,
        name: createdPlace.name,
        slug: createdPlace.slug,
        image: getUrl(createdPlace.image),
        en: createdPlace.en,
        region: createdPlace.region,
        type: createdPlace.type,
        continent: createdPlace.continent,
      },
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return next(createError(error, 400, error.message));
    }
    return next(createError(error, 500));
  }
};

module.exports.updatePlace = async (req, res, next) => {
  try {
    const place = req.place;
    const foundPlace = req.foundPlace;

    foundPlace.type = place.type;
    foundPlace.continent = place.continent;
    foundPlace.region = place.region;
    foundPlace.name = place.name;
    foundPlace.en = place.en;
    foundPlace.slug = place.slug;
    foundPlace.image = place.image;

    await foundPlace.save();

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      message: "Thành công",
      data: {
        _id: foundPlace._id,
        name: foundPlace.name,
        slug: foundPlace.slug,
        image: getUrl(foundPlace.image),
        en: foundPlace.en,
        region: foundPlace.region,
        type: foundPlace.type,
        continent: foundPlace.continent,
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({
      deleted: false,
    });

    const getUrl = require("../../helpers/urlFromPath");
    return res.status(200).json({
      data: places.map((place) => ({
        _id: place._id,
        name: place.name,
        slug: place.slug,
        image: place.image ? getUrl(place.image) : "",
        en: place.en,
        region: place.region,
        type: place.type,
        continent: place.continent,
      })),
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deletePlace = async (req, res, next) => {
  const { _id } = req.body;
  try {
    const place = await Place.findById(_id);

    if (!place) {
      return next(createError(new Error(""), 400, "Không tìm thấy địa điểm"));
    }

    const tour = await Tour.findOne({
      deleted: false,
      destinations: {
        $in: [_id],
      },
    });
    if (tour) {
      return next(
        createError(new Error(""), 400, "Địa điểm đang được sử dụng.")
      );
    }

    const visa = await Visa.findOne({
      country: _id,
      deleted: false
    });
    if (visa) {
      return next(
        createError(new Error(""), 400, "Địa điểm đang được sử dụng.")
      );
    }

    place.deleted = true;
    await place.save();

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
