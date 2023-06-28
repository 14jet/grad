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
  slug: slugType,
  name: stringType,
  deleted: {
    type: Boolean, 
    default: false
  },
  en: {
    type: Object,
    required: true,
    name: stringType,
  },
});

const templates = [
  {
    slug: "cam-nang-du-lich",
    name: "Cẩm nang du lịch",
    en: { name: "Travel handbooks" },
  },
  {
    slug: "nhat-ky-hanh-trinh",
    name: "Nhật ký hành trình",
    en: { name: "Travel Diaries" },
  },
  {
    slug: "trai-nghiem-kham-pha",
    name: "Trải nghiệm khám phá",
    en: { name: "Travel experiences" },
  },
  {
    slug: "diem-den-hap-dan",
    name: "Điểm đến hấp dẫn",
    en: { name: "Nice places" },
  },
];

module.exports = mongoose.model("GuideCategory", schema);
