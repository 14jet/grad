const createError = require("../../helpers/errorCreator");
const { yupDeltaSchema } = require("../../helpers/quillDelta");
const { object } = require("yup");

module.exports = async (req, res, next) => {
  try {
    const termsSchema = object({
      privacy: yupDeltaSchema.required("Thiếu chính sách bảo mật khách hàng"),
      en: object({
        privacy: yupDeltaSchema.required(
          "Bản tiếng Anh: Thiếu chính sách bảo mật khách hàng"
        ),
      }),
    });

    try {
      await termsSchema.validate(req.body);
    } catch (error) {
      return next(createError(new Error(""), 400, error.message));
    }

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
