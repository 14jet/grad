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
const {  MODERATOR, CLIENT } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// routes
router.get("/", requireAuth(CLIENT), getTerms);
router.put("/", requireAuth(MODERATOR), updateTermsValidator, updateTerms);

module.exports = router;
