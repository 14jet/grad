const express = require("express");
const router = express.Router();

// routes
router.get("*", require("../../controllers/images"));

module.exports = router;
