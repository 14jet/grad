const express = require("express");
const router = express.Router();

// controllers
const {
  getTours,
  bookTour,
  callMeBack,
  getTourBySlug,
} = require("../../controllers/client/tour.controller");

// middlewares
const requestLimiter = require("../../middlewares/requestLimiter.middleware");
const cache = require("../../middlewares/cache.middleware");
const flushCache = require("../../middlewares/cache.middleware")(0, true);

// routes
router.get("/", requestLimiter(), cache(), getTours);
router.post("/booking", requestLimiter(),flushCache, bookTour);
router.post("/advisory", requestLimiter(),flushCache, callMeBack);
router.get("/:slug", requestLimiter(), cache(), getTourBySlug);

module.exports = router;
