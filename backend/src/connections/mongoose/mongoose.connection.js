const mongoose = require("mongoose");
const logger = require("../../helpers/logger");

const connectMongodb = async () => {
  try {
    mongoose.set("toJSON", { getters: true });
    mongoose.set("toObject", { getters: true });
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to mongodb");
  } catch (error) {
    logger(error.stack);
    throw new Error(error);
  }
};

module.exports = connectMongodb;
