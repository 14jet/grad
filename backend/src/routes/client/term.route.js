const express = require("express");
const router = express.Router();

// controllers
const { getTerm } = require("../../controllers/client/term.controller");

// middlewares
const requestLimiter = require("../../middlewares/requestLimiter.middleware");
const cache = require("../../middlewares/cache.middleware");

// routes
router.get("/:type", requestLimiter(), cache(), getTerm);

module.exports = router;
