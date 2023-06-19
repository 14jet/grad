const createError = require("../../helpers/errorCreator");
const { object, string, number } = require("yup");
const Place = require("../../models/place.model");
const Visa = require("../../models/visa.model");
const {
  yupDeltaSchema,
  yupCheckEmptyDelta,
} = require("../../helpers/quillDelta");

module.exports = async (req, res, next) => {
  try {
    const MUST_BE_STRING = "Phải là chuỗi";
    const visaSchema = object({
      name: string(MUST_BE_STRING).required("Thiếu tên visa"),
      slug: string("Slug phải là chuỗi").required("Thiếu slug"),
      country: string(MUST_BE_STRING).required("Thiếu nước"),
      detail: yupDeltaSchema
        .test(yupCheckEmptyDelta("Chi tiết visa không được trống"))
        .required("Thiếu chi tiết phiếu dịch vụ"),
      price: number().positive().required("Thiếu giá"),
      price_policies: object({
        includes: yupDeltaSchema
          .test(yupCheckEmptyDelta("Giá bao gồm không được trống"))
          .required("Thiếu giá bao gồm"),
        excludes: yupDeltaSchema
          .test(yupCheckEmptyDelta("Giá không bao gồm không được trống"))
          .required("Thiếu giá không bao gồm"),
      }).required("Thiếu bảng giá"),
      terms: object({
        cancellation: yupDeltaSchema
          .test(yupCheckEmptyDelta("điều kiện hoàn hủy không được trống"))
          .required("Thiếu điều kiện hoàn hủy"),
        notes: yupDeltaSchema.optional(),
      }).required("Thiếu điều khoản"),
      en: object({
        name: string(MUST_BE_STRING).required("Bản tiếng Anh: Thiếu tên visa"),
        detail: yupDeltaSchema
          .test(
            yupCheckEmptyDelta("Bản tiếng Anh: chi tiết visa không được trống")
          )
          .required("Bản tiếng Anh: Thiếu chi tiết phiếu dịch vụ"),
        price_policies: object({
          includes: yupDeltaSchema
            .test(
              yupCheckEmptyDelta("Bản tiếng Anh: giá bao gồm không được trống")
            )
            .required("Bản tiếng Anh: Thiếu giá bao gồm"),
          excludes: yupDeltaSchema
            .test(
              yupCheckEmptyDelta(
                "Bản tiếng Anh: giá không bao gồm không được trống"
              )
            )
            .required("Bản tiếng Anh: Thiếu giá không bao gồm"),
        }).required(),
        terms: object({
          cancellation: yupDeltaSchema
            .test(
              yupCheckEmptyDelta(
                "Bản tiếng Anh: điều kiện hoàn hủy không được trống"
              )
            )
            .required("Bản tiếng Anh: Thiếu điều kiện hoàn hủy"),
          notes: yupDeltaSchema.optional(),
        }).required("Bản tiếng Anh: Thiếu điều khoản"),
      }).required("Thiếu bản tiếng Anh"),
    });

    try {
      await visaSchema.validate(req.body);
    } catch (error) {
      return next(createError(new Error(""), 400, error.message));
    }

    const visaWithTheSameName = await Visa.findOne({
      name: req.body.name,
    });
    if (visaWithTheSameName) {
      return next(createError(new Error(""), 400, "Tên visa đã tồn tại"));
    }

    const visaWithTheSameNameEN = await Visa.findOne({
      "en.name": req.body.en.name,
    });
    if (visaWithTheSameNameEN) {
      return next(
        createError(new Error(""), 400, "Tên visa tiếng Anh đã tồn tại")
      );
    }

    const visaWithTheSameSlug = await Visa.findOne({
      slug: req.body.slug,
    });
    if (visaWithTheSameSlug) {
      return next(createError(new Error(""), 400, "Slug đã tồn tại"));
    }

    const country = await Place.findOne({
      _id: req.body.country,
    });

    if (!country) {
      return next(createError(new Error(""), 400, "Không tìm thấy nước"));
    }

    if (country.type !== "country") {
      return next(createError(new Error(""), 400, "Nước không hợp lệ"));
    }

    req.country = country;

    return next();
  } catch (error) {
    return next(createError(error, 500));
  }
};
