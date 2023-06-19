const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
  },
  sheetId: {
    type: String,
  },
  tourBookingSheetId: {
    type: String,
  },
  tourCallbackRequestSheetId: {
    type: String,
  },
});

module.exports = mongoose.model("Settings", schema);
