const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ADMIN, MODERATOR, CLIENT } = require("../config/auth.config");

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, 
    maxlength: 50
  },
  resetPassword: {
    type: String,
    minlength: 8, 
    maxlength: 50
  },
  role: {
    type: String,
    enum: [ADMIN, MODERATOR, CLIENT],
    default: "client",
  },
});

module.exports = mongoose.model("User", schema);
