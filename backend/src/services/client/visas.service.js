const Visa = require("../../models/visa.model");

module.exports.getVisas = async (lang) => {
  let visas = await Visa.fetchAll();
  visas = visas.map((visa) => {
    // fields phụ thuộc ngôn ngữ
    let name;
    let detail;
    let price_policies;
    let terms;

    if (lang === "en") {
      name = visa.en.name;
      detail = visa.en.detail;
      price_policies = visa.en.price_policies;
      terms = visa.en.terms;
    } else {
      name = visa.name;
      detail = visa.detail;
      price_policies = visa.price_policies;
      terms = visa.terms;
    }

    return {
      name,
      detail,
      price_policies,
      terms,

      id: visa.id,
      country: visa.country,
      price: visa.price,
    };
  });

  return visas;
};
