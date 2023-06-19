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
  detail: mongooseDeltaSchema,
  price: {
    type: Number,
    min: 1,
  },    
  deleted: {
    type: Boolean, 
    default: false
  },
  price_policies: {
    type: Object,
    required: true,
    includes: mongooseDeltaSchema,
    excludes: mongooseDeltaSchema,
  },
  terms: {
    type: Object,
    required: true,
    cancellation: mongooseDeltaSchema,
    notes: mongooseDeltaSchema,
  },
  en: {
    type: Object,
    required: true,
    name: {
      type: String,
      required: true,
    },
    detail: mongooseDeltaSchema,
    price_policies: {
      type: Object,
      required: true,
      includes: mongooseDeltaSchema,
      excludes: mongooseDeltaSchema,
    },
    terms: {
      type: Object,
      required: true,
      cancellation: mongooseDeltaSchema,
      notes: mongooseDeltaSchema,
    },
  },
});

module.exports = mongoose.model("Visa", schema);
