const createError = require("../../helpers/errorCreator");
const Term = require("../../models/term.model");

module.exports.getTerm = async (req, res, next) => {
  try {
    const lang = req.lang;

    const term = await Term.findOne();

    if (!term) {
      return next(
        createError(new Error(""), 400, {
          en: "Not Found",
          vi: "Không tìm thấy trang",
        })
      );
    }

    return res.status(200).json({
      data: lang === "en" ? term.en.privacy : term.privacy,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
