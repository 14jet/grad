const Company = require("../../models/company.model");

module.exports.getCompanyInfo = async (lang) => {
  const data = await Company.get();

  // fields phụ thuộc ngôn ngữ
  let name;
  let address;
  let license_name;
  let license_agency;

  if (lang === "en") {
    name = data.en.name;
    address = data.en.address;
    license_name = data.en.license_name;
    license_agency = data.en.license_agency;
  } else {
    name = data.name;
    address = data.address;
    license_name = data.license_name;
    license_agency = data.license_agency;
  }

  return {
    name,
    address,
    license_name,
    license_agency,

    phone: data.phone,
    hotline: data.hotline,
    email: data.email,
    website: data.website,
    license_number: data.license_number,
    license_date: data.license_date,
    facebook: data.facebook,
    instagram: data.instagram,
    youtube: data.youtube,
  };
};
