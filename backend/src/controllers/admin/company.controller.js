const Company = require("../../models/company.model");
const createError = require("../../helpers/errorCreator");

module.exports.getCompanyInfo = async (req, res, next) => {
  try {
    let data = await Company.findOne();
    if (!data) {
      data = await Company.create({
        name: "",
        address: "",
        phone: "",
        hotline: "",
        email: "",
        website: "",
        license_name: "",
        license_agency: "",
        license_number: "",
        license_date: "",
        facebook: "",
        instagram: "",
        youtube: "",
        en: {
          name: "",
          address: "",
          license_name: "",
          license_agency: "",
        },
      });
    }

    return res.status(200).json({
      data: data,
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};

module.exports.updateCompanyInfo = async (req, res, next) => {
  try {
    const data = req.body;
    await Company.updateMany({}, { $set: data });

    return res.status(200).json({
      data: data,
      message: "Thành công",
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
