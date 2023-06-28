const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongooseDeltaSchema } = require("../helpers/quillDelta");
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
  name: stringType,
  slug: slugType,
  country: {
    type: Schema.Types.ObjectId,
    ref: "Place",
    required: true,
  },
  price: {
    type: Number,
    min: 0,
    max: 1000 * 1000 * 1000,
    default: 0
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
    name: stringType,
    detail: mongooseDeltaSchema,
    term: mongooseDeltaSchema,
    priceIncludes: mongooseDeltaSchema,
    priceExcludes: mongooseDeltaSchema,
    cancellationPolicy: mongooseDeltaSchema,
  },
});

module.exports = mongoose.model("Visa", schema);
