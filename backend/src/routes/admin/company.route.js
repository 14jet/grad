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
const { ADMIN, MODERATOR, CLIENT } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// routes
router.get("/", requireAuth(MODERATOR), getCompanyInfo);
router.put(
  "/",
  requireAuth(ADMIN),
  updateCompanyInfoValidator,
  updateCompanyInfo
);

module.exports = router;
