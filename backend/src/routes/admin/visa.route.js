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

// routes
router.get("/", requireAuth(MODERATOR), getVisas);
router.post("/", requireAuth(ADMIN), addVisaValidator, addVisa);
router.put("/", requireAuth(ADMIN), updateVisaValidator, updateVisa);
router.delete("/", requireAuth(ADMIN), deleteVisa);

router.get("/payments", requireAuth(MODERATOR), getVisaPayments);
router.delete("/payments", requireAuth(ADMIN), deleteVisaPayment);
router.get("/:slug", requireAuth(MODERATOR), getSingleVisa);

module.exports = router;
