const express = require("express");
const router = express.Router();

// controllers
const {
  getCompanyInfo,
  updateCompanyInfo,
} = require("../../controllers/admin/company.controller");

// validator
const updateCompanyInfoValidator = require("../../validators/companyInfo/updateCompany.validator");

// middleware
const { MODERATOR, CLIENT } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// routes
router.get("/", requireAuth(CLIENT), getCompanyInfo);
router.put(
  "/",
  requireAuth(MODERATOR),
  updateCompanyInfoValidator,
  updateCompanyInfo
);

module.exports = router;
