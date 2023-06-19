const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  hotline: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  website: {
    type: String,
    default: "",
  },
  license_name: {
    type: String,
    default: "",
  },
  license_agency: {
    type: String,
    default: "",
  },
  license_number: {
    type: String,
    default: "",
  },
  license_date: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  youtube: {
    type: String,
    default: "",
  },
  en: {
    type: Object,
    default: {
      name: "",
      address: "",
      license_name: "",
      license_agency: "",
    },
    name: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    license_name: {
      type: String,
      default: "",
    },
    license_agency: {
      type: String,
      default: "",
    },
  },
});

module.exports = mongoose.model("Company", schema);
