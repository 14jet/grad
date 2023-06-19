const express = require("express");
const router = express.Router();

// controllers
const {
  getTerms,
  updateTerms,
} = require("../../controllers/admin/terms.controller");

// validators
const updateTermsValidator = require("../../validators/terms/updateTerms.validator");

// middlewares
const { ADMIN, MODERATOR, CLIENT } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// routes
router.get("/", requireAuth(MODERATOR), getTerms);
router.put("/", requireAuth(ADMIN), updateTermsValidator, updateTerms);

module.exports = router;
