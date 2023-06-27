const createError = require("../../helpers/errorCreator");
const Visa = require("../../models/visa.model");
const VisaOrder = require("../../models/visa-order.model");

module.exports.addVisa = async (req, res, next) => {
  try {
    const newVisa = await Visa.create(req.body);
    newVisa.country = req.country;

    return res.status(200).json({
      message: "Thành công",
      data: newVisa,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.updateVisa = async (req, res, next) => {
  try {
    const visa = req.visa;
    visa.name = req.body.name;
    visa.slug = req.body.slug;
    visa.detail = req.body.detail;
    visa.term = req.body.term;
    visa.priceIncludes = req.body.priceIncludes;
    visa.priceExcludes = req.body.priceExcludes;
    visa.cancellationPolicy = req.body.cancellationPolicy;
    visa.country = req.body.country;
    visa.en = req.body.en;
    visa.price = req.body.price;

    await visa.save();

    return res.status(200).json({
      message: "Thành công",
      data: {
        ...visa._doc,
        country: req.country,
      },
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deleteVisa = async (req, res, next) => {
  try {
    const visa = req.visa;
    visa.deleted = true;
    await visa.save();
    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getVisas = async (req, res, next) => {
  try {
    const visas = await Visa.find({deleted: false}).populate("country");
    return res.status(200).json({
      data: visas,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getSingleVisa = async (req, res, next) => {
  try {
    const { slug } = req.params;

    const visa = await Visa.findOne({ slug, deleted: false });

    if (!visa) {
      return next(createError(new Error(""), 400, "Not found"));
    }

    return res.status(200).json({
      data: visa,
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.getVisaPayments = async (req, res, next) => {
  try {
    const orders = await VisaOrder.find().sort({
      updatedAt: -1,
    });

    return res.status(200).json({
      data: orders,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.deleteVisaPayment = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const payment = await VisaOrder.findOne({ _id });
    if (!payment) {
      return next(createError(new Error(""), 400, "Not Found"));
    }
    await VisaOrder.deleteOne({ _id });

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
