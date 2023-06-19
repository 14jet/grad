const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongooseDeltaSchema, DELTA } = require("../helpers/quillDelta");

const schema = new Schema({
  privacy: {
    type: mongooseDeltaSchema,
    default: DELTA,
  },
  en: {
    privacy: {
      type: mongooseDeltaSchema,
      default: DELTA,
    },
  },
});

module.exports = mongoose.model("Terms", schema);
