const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },

  slug: {
    type: String,
    required: true,
  },
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
    name: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model("Place", schema);
