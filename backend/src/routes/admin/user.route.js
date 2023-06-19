const express = require("express");
const router = express.Router();

// controllers
const {
  login,
  register,
  getAll,
  changePassword,
  changeRole,
  deleteUser,
  resetPassword,
} = require("../../controllers/admin/user.controller");

// middlewares
const { ADMIN, MODERATOR, CLIENT } = require("../../config/auth.config");
const requireAuth = require("../../middlewares/requireAuth.middleware");

router.post("/login", login);
router.post("/change-password", requireAuth(CLIENT), changePassword);
router.put("/change-role", requireAuth(ADMIN), changeRole);
router.put("/reset-password", resetPassword);
router.post("/register", requireAuth(ADMIN), register);
router.get("/", requireAuth(MODERATOR), getAll);
router.delete("/", requireAuth(ADMIN), deleteUser);

module.exports = router;
