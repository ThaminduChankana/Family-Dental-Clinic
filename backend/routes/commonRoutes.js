const express = require("express");
const router = express.Router();
const { getBlogs, getBlogById } = require("../controllers/blogController");
const { getFeedback } = require("../controllers/feedbackController");
const { getQuestion } = require("../controllers/questionController");
const { getScheduleHandling, getScheduleHandlingId } = require("../controllers/scheduleHandlingController");

// Routes for Users to get blog articles
router.route("/blogs").get(getBlogs);
router.route("/blogs/:id").get(getBlogById);
router.route("/feedback").get(getFeedback);
router.route("/question").get(getQuestion);

//Routes for doctor schedule
router.route("/schedules").get(getScheduleHandling);
router.route("/schedules/:id").get(getScheduleHandlingId);

module.exports = router;
