const express = require("express");
const router = express.Router();

// controllers
const {
  addGuide,
  updateGuide,
  deleteGuide,
  fetchSingleGuide,
  fetchGuides,
  fetchCategory,
  addCategoryItem,
  updateCategoryItem,
  deleteCategoryItem,
} = require("../../controllers/admin/guide.controller");

// middlewares
const multer = require("../../middlewares/multer.middleware");
const { MODERATOR, CLIENT } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

// validators
const addGuideValidator = require("../../validators/guide/addGuide.validator");
const updateGuideValidator = require("../../validators/guide/updateGuide.validator");
const deleteGuideValidator = require("../../validators/guide/deleteGuide.validator");
const addGuideCategoryItemValidator = require("../../validators/guide/addGuideCategoryItem.validator");
const updateGuideCategoryItemValidator = require("../../validators/guide/updateGuideCategoryItem.validator");
const deleteGuideCategoryItemValidator = require("../../validators/guide/deleteGuideCategoryItem.validator");

// multer
const guideMulter = multer.upload().fields([{ name: "thumb", maxCount: 1 }]);

// routes
router.post(
  "/",
  requireAuth(MODERATOR),
  guideMulter,
  addGuideValidator,
  addGuide
);
router.get("/", requireAuth(CLIENT), fetchGuides);
router.put(
  "/",
  requireAuth(MODERATOR),
  guideMulter,
  updateGuideValidator,
  updateGuide
);
router.delete("/", requireAuth(MODERATOR), deleteGuideValidator, deleteGuide);
router.get("/category", requireAuth(CLIENT), fetchCategory);
router.post(
  "/category",
  requireAuth(MODERATOR),
  addGuideCategoryItemValidator,
  addCategoryItem
);
router.put(
  "/category",
  requireAuth(MODERATOR),
  updateGuideCategoryItemValidator,
  updateCategoryItem
);
router.delete(
  "/category",
  requireAuth(MODERATOR),
  deleteGuideCategoryItemValidator,
  deleteCategoryItem
);
router.get("/:slug", requireAuth(CLIENT), fetchSingleGuide);

module.exports = router;
