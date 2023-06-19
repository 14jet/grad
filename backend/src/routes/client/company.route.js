const express = require("express");
const router = express.Router();

// controllers
const {
  getCompanyInfo,
} = require("../../controllers/client/company.controller");

// middlewares
const requestLimiter = require("../../middlewares/requestLimiter.middleware");
const cache = require("../../middlewares/cache.middleware");

// routes
router.get("/", requestLimiter(), cache(), getCompanyInfo);

module.exports = router;
