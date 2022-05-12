const express = require("express");
const router = express.Router();
const { getBlogs, getBlogById } = require("../controllers/blogController");

// Routes for Users to get blog articles
router.route("/blogs").get(getBlogs);
router.route("/blogs/:id").get(getBlogById);

module.exports = router;
