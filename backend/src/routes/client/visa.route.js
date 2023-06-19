const express = require("express");
const router = express.Router();

// controllers
const {
  getVisas,
  getVisasByCountry,
  createPaypalOrder,
  capturePaypalOrder,
  order,
  getOrder,
} = require("../../controllers/client/visa.controller");

// middlewares
const requestLimiter = require("../../middlewares/requestLimiter.middleware");
const cache = require("../../middlewares/cache.middleware");

// routes
router.get("/", requestLimiter(), cache(), getVisas);
router.get("/country/:country", requestLimiter(), cache(), getVisasByCountry);
router.post(
  "/payment/create-paypal-order",
  requestLimiter(),
  createPaypalOrder
);
router.post(
  "/payment/capture-paypal-order",
  requestLimiter(),
  capturePaypalOrder
);
router.post("/payment/order", requestLimiter(), order);
router.get("/payment/order/:orderId", requestLimiter(), getOrder);

module.exports = router;
