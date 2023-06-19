const Term = require("../../models/term.model");
const createError = require("../../helpers/errorCreator");

module.exports.getTerms = async (req, res, next) => {
  try {
    let terms = await Term.findOne();

    if (!terms) {
      terms = await Term.create({});
    }

    return res.status(200).json({
      data: terms,
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.updateTerms = async (req, res, next) => {
  try {
    const term = await Term.findOne({});
    term.privacy = req.body.privacy;

    term.en.privacy = req.body.en.privacy;

    await term.save();

    return res.status(200).json({
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
