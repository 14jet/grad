const express = require("express");
const router = express.Router();

// controllers
const {
  addPlace,
  getPlaces,
  deletePlace,
  updatePlace,
} = require("../../controllers/admin/place.controller");

// middlewares
const multer = require("../../middlewares/multer.middleware");
const { ADMIN, MODERATOR } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// validators
const addPlaceValidator = require("../../validators/place/addPlace.validator");
const updatePlaceValidator = require("../../validators/place/updatePlace.validator");

// multer
const placeMulter = multer.upload().fields([
  { name: "image", maxCount: 1 },
]);

// routes
router.post("/", requireAuth(ADMIN), placeMulter, addPlaceValidator, addPlace);
router.put(
  "/",
  requireAuth(ADMIN),
  placeMulter,
  updatePlaceValidator,
  updatePlace
);
router.get("/", requireAuth(MODERATOR), getPlaces);
router.delete("/", requireAuth(ADMIN), deletePlace);

module.exports = router;
