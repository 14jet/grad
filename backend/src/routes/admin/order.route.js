const express = require("express");
const router = express.Router();

// controllers
const {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../../controllers/admin/order.controller");

// middlewares
const { ADMIN, MODERATOR } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// routes
router.put(
  "/",
  requireAuth(ADMIN),
  updateOrderStatus
);
router.get("/", requireAuth(MODERATOR), getOrders);
router.delete("/", requireAuth(ADMIN), deleteOrder);

module.exports = router;
