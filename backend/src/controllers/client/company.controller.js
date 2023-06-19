const createError = require("../../helpers/errorCreator");
const Company = require("../../models/company.model");

module.exports.getCompanyInfo = async (req, res, next) => {
  try {
    const lang = req.lang;
    const data = await Company.findOne();
    if (!data) throw new Error("Not Found Company Info");

    let resData;
    if (lang === "en") {
      resData = {
        name: data.name,
        address: data.address,
        phone: data.phone,
        hotline: data.hotline,
        email: data.email,
        website: data.website,
        license_name: data.license_name,
        license_agency: data.license_agency,
        license_number: data.license_number,
        license_date: data.license_date,
        facebook: data.facebook,
        instagram: data.instagram,
        youtube: data.youtube,
      };
    } else {
      resData = {
        name: data.en.name,
        address: data.en.address,
        phone: data.phone,
        hotline: data.hotline,
        email: data.email,
        website: data.website,
        license_name: data.en.license_name,
        license_agency: data.en.license_agency,
        license_number: data.license_number,
        license_date: data.license_date,
        facebook: data.facebook,
        instagram: data.instagram,
        youtube: data.youtube,
      };
    }

    return res.status(200).json({
      data: resData,
    });
  } catch (error) {
    return next(createError(error, 500));
  }
};
