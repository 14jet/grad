const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { mongooseDeltaSchema } = require("../helpers/quillDelta");
const getUrlFromPath = require("../helpers/urlFromPath");

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

const schema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "GuideCategory",
      required: true,
    },
    title: stringType,
    slug:slugType,
    author: stringType,
    content: mongooseDeltaSchema,
    thumb: {
      type: String,
      required: true,
      get: (value) => {
        return getUrlFromPath(value);
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    en: {
      type: Object,
      required: true,
      title:stringType,
      content: mongooseDeltaSchema,
    },
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);

module.exports = mongoose.model("Guide", schema);
