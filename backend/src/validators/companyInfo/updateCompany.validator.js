const createError = require("../../helpers/errorCreator");
const { object, string } = require("yup");

module.exports = async (req, res, next) => {
  try {
    const MUST_BE_STRING = "Phải là chuỗi";

    const companySchema = object({
      name: string().typeError(MUST_BE_STRING).required("Thiếu tên công ty"),
      address: string()
        .typeError(MUST_BE_STRING)
        .required("Thiếu địa chỉ công ty"),
      phone: string().typeError(MUST_BE_STRING).required("Thiếu số điện thoại"),
      hotline: string().typeError(MUST_BE_STRING).required("Thiếu hotline"),
      email: string().typeError(MUST_BE_STRING).required("Thiếu email"),
      website: string().typeError(MUST_BE_STRING).required("Thiếu website"),
      license_name: string()
        .typeError(MUST_BE_STRING)
        .required("Thiếu tên giấy phép kinh doanh"),
      license_agency: string()
        .typeError(MUST_BE_STRING)
        .required("Thiếu nơi cấp giấy phép kinh doanh"),
      license_number: string()
        .typeError(MUST_BE_STRING)
        .required("Thiếu số giấy phép kinh doanh"),
      license_date: string()
        .typeError(MUST_BE_STRING)
        .required("Thiếu ngày cấp giấy phép kinh doanh"),
      facebook: string().typeError(MUST_BE_STRING),
      instagram: string().typeError(MUST_BE_STRING),
      youtube: string().typeError(MUST_BE_STRING),

      en: object({
        name: string()
          .typeError(MUST_BE_STRING)
          .required("Bản tiếng Anh: Thiếu tên công ty"),
        address: string()
          .typeError(MUST_BE_STRING)
          .required("Bản tiếng Anh: Thiếu địa chỉ công ty"),
        license_name: string()
          .typeError(MUST_BE_STRING)
          .required("Bản tiếng Anh: Thiếu tên giấy phép kinh doanh"),
        license_agency: string()
          .typeError(MUST_BE_STRING)
          .required("Bản tiếng Anh: Thiếu nơi cấp giấy phép kinh doanh"),
      }).required("Thiếu bản tiếng Anh"),
    });

    try {
      await companySchema.validate(req.body);
    } catch (error) {
      return next(createError(new Error(""), 400, error.message));
    }

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
