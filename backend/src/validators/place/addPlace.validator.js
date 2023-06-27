const createError = require("../../helpers/errorCreator");
const Place = require("../../models/place.model");

module.exports = async (req, res, next) => {
  try {

    const place = JSON.parse(req.body.place);

    const placeWithTheSameName = await Place.findOne({
      name: place.name, deleted: false
    });
    if (placeWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên đã tồn tại."));
    }

    const placeWithTheSameNameEN = await Place.findOne({
      "en.name": place.en.name,deleted: false
    });
    if (placeWithTheSameNameEN) {
      return next(createError(new Error(""), 400, "Tên tiếng Anh đã tồn tại."));
    }

    const placeWithTheSameSlug = await Place.findOne({
      slug: place.slug,deleted: false
    });

    if (placeWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại."));
    }

    const image = req.files?.image?.[0].path.split("/uploads/")[1] || '';
    place.image = image
    req.place = place;
    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
