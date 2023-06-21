const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    type: {
      type: String,
      enum: ["tour", "visa", "call"],
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    fullname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },
    solved: {
      type: Boolean,
      default: false,
    },
    otherDetails: {
      type: Object,
      default: {},
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

schema.methods.getVerboseType = function () {
  const typesMap = new Map([
    ["tour", "Có khách hàng đặt tour"],
    ["visa", "Có khách hàng đặt visa"],
    ["call", "Có khách hàng yêu cầu gọi lại"],
  ]);
  return typesMap.get(this.type);
};

module.exports = mongoose.model("Order", schema);
