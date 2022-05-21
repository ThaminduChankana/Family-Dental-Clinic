const express = require("express");
const router = express.Router();
const { getBlogs, getBlogById } = require("../controllers/blogController");
const {getFeedback} = require ("../controllers/feedbackController")

// Routes for Users to get blog articles
router.route("/blogs").get(getBlogs);
router.route("/blogs/:id").get(getBlogById);
router.route("/feedback").get(getFeedback);

module.exports = router;
