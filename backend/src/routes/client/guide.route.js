const express = require("express");
const router = express.Router();

// controllers
const {
  getGuides,
  getSingleGuide,
} = require("../../controllers/client/guide.controller");

// middlewares
const requestLimiter = require("../../middlewares/requestLimiter.middleware");
const cache = require("../../middlewares/cache.middleware");

// routes
router.get("/", requestLimiter(), cache(), getGuides);
router.get("/:slug", requestLimiter(), cache(), getSingleGuide);

module.exports = router;
