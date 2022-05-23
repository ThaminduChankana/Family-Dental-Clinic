const express = require("express");
const router = express.Router();
const { getBlogs, getBlogById } = require("../controllers/blogController");
const { getFeedback } = require("../controllers/feedbackController");
const { getQuestion } = require("../controllers/questionController");

// Routes for Users to get blog articles
router.route("/blogs").get(getBlogs);
router.route("/blogs/:id").get(getBlogById);
router.route("/feedback").get(getFeedback);
router.route("/question").get(getQuestion);

module.exports = router;
