const cors = require("cors");

const whiteList = [
  "http://localhost:3001",
  "http://localhost:3000",
  "http://vvvv.space",
  "http://admin.vvvv.space",
  "https://vvvv.space",
  "https://admin.vvvv.space",
];

const corsOption = {
  origin: whiteList,
  credentials: true,
};

module.exports = cors(corsOption);
