const express = require("express");
const { getPatientblogs } = require("../controllers/patientblogController");
const router = express.Router();
const { getBlogById } = require("../controllers/blogController");
const { protect } = require("../middlewares/authPatientMiddleware");

router.route("/").get(protect, getPatientblogs);
router.route("/:id").get(getBlogById);

module.exports = router;
