const express = require("express");
const router = express.Router();

// controllers
const {
  updateTour,
  deleteTour,
  getTours,
  createTour,
  fetchSingleTour,
} = require("../../controllers/admin/tour.controller");

// middlewares
const multer = require("../../middlewares/multer.middleware");
const { ADMIN, MODERATOR } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// validators
const addTourValidator = require("../../validators/tour/addTour.validator");
const updateTourValidator = require("../../validators/tour/updateTour.validator");
const deleteTourValidator = require("../../validators/tour/deleteTour.validator");

// config multer
const tourFilenameHandler = (filename, file) => {
  const stringHandler = require("../../helpers/stringHandler");

  if (file.fieldname !== "images") {
    return stringHandler.slugify(filename);
  }

  const [itiIndex, imgIndex, realname] = filename.split("namedivider");
  file.itiIndex = Number(itiIndex);
  file.imgIndex = Number(imgIndex);

  return stringHandler.slugify(realname);
};

const tourMulter = multer.upload(tourFilenameHandler).fields([
  { name: "thumb", maxCount: 1 },
  { name: "images", maxCount: 100 },
]);

// routes
router.post("/", requireAuth(ADMIN), tourMulter, addTourValidator, createTour);
router.put(
  "/",
  requireAuth(ADMIN),
  tourMulter,
  updateTourValidator,
  updateTour
);
router.get("/", requireAuth(MODERATOR), getTours);
router.get("/:tourCode", requireAuth(MODERATOR), fetchSingleTour);
router.delete("/", requireAuth(ADMIN), deleteTourValidator, deleteTour);

module.exports = router;
