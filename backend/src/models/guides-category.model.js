const path = require("path");
const rootDir = require("../helpers/rootDir");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  slug: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean, 
    default: false
  },
  en: {
    type: Object,
    required: true,
    name: {
      type: String,
      required: true,
    },
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
  {
    name: "mạo hiểm",
    en: { name: "maohiem" },
    slug: "mao-hiem",
  },
];

module.exports = mongoose.model("GuideCategory", schema);
