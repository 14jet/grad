const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const stringType = {
  type: String,
  required: true,
  trim: true,
  maxlength: 500,
};

const slugType = {
  ...stringType,
  validate: {
    validator: (value) => /^[a-z0-9-]{1,500}$/.test(value),
    message: "Slug chỉ được chứa a - z không dấu, 0 - 9, 1 - 500 ký tự.",
  },
};

const schema = new Schema({
  name:stringType,
  slug: slugType,
  continent: {
    type: String,
    required: true,
    enum: ["chau-a", "chau-au", "chau-phi", "chau-my", "chau-dai-duong"],
  },
  region: {
    type: String,
    enum: [
      "mien-bac",
      "bac-trung-bo",
      "nam-trung-bo",
      "tay-nguyen",
      "dong-nam-bo",
      "mien-tay",
      "",
    ],
    default: "",
  },
  type: {
    type: String,
    enum: ["country", "province"],
  },
  image: {
    type: String,
    default: "",
  },
  deleted: {
    type: Boolean, 
    default: false
  },
  en: {
    name: stringType,
  },
});

module.exports = mongoose.model("Place", schema);
