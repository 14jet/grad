const express = require("express");
const router = express.Router();

// controllers
const {
  addVisa,
  updateVisa,
  deleteVisa,
  getVisas,
  getSingleVisa,
  getVisaPayments,
  deleteVisaPayment,
} = require("../../controllers/admin/visa.controller");

// middlewares
const { ADMIN, MODERATOR, CLIENT } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// validators
const addVisaValidator = require("../../validators/visa/addVisa.validator");
const updateVisaValidator = require("../../validators/visa/updateVisa.validator");
const deleteVisaValidator = require("../../validators/visa/deleteVisa.validator");

// routes
router.get("/", requireAuth(CLIENT), getVisas);
router.post("/", requireAuth(MODERATOR), addVisaValidator, addVisa);
router.put("/", requireAuth(MODERATOR), updateVisaValidator, updateVisa);
router.delete("/", requireAuth(MODERATOR),deleteVisaValidator, deleteVisa);

router.get("/payments", requireAuth(CLIENT), getVisaPayments);
router.delete("/payments", requireAuth(MODERATOR), deleteVisaPayment);
router.get("/:slug", requireAuth(CLIENT), getSingleVisa);

module.exports = router;
