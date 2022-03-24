const express = require("express");
const { getAdminblogs } = require("../controllers/adminblogController");
const { getBlogById } = require("../controllers/blogController");
const router = express.Router();
const { protect } = require("../middlewares/authAdminMiddleware");

router.route("/").get(protect, getAdminblogs);
router.route("/:id").get(getBlogById);

module.exports = router;
