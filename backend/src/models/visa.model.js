const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongooseDeltaSchema } = require("../helpers/quillDelta");

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  price: {
    type: Number,
    min: 1,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  detail: mongooseDeltaSchema,
  term: mongooseDeltaSchema,
  priceIncludes: mongooseDeltaSchema,
  priceExcludes: mongooseDeltaSchema,
  cancellationPolicy: mongooseDeltaSchema,
  en: {
    type: Object,
    required: true,
    name: {
      type: String,
      required: true,
    },
    detail: mongooseDeltaSchema,
    term: mongooseDeltaSchema,
    priceIncludes: mongooseDeltaSchema,
    priceExcludes: mongooseDeltaSchema,
    cancellationPolicy: mongooseDeltaSchema,
  },
});

module.exports = mongoose.model("Visa", schema);
