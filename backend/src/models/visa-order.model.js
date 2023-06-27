const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
  {
    visaName: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      min: 1, 
      max: 1000 * 1000 * 1000
    },
    fullname: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    passengers: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "idle",
      enum: [
        "idle",
        "is_creating_order",
        "created_order",
        "failed_to_create_order",
        "is_capturing",
        "succeeded",
        "failed_to_capture",
      ],
    },
    paypalOrderId: String,
    paypalTransactionId: String,
    error: String,
    deleted: {
      type: Boolean, 
      default: false
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VisaOrder", schema);
