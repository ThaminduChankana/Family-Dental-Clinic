const express = require("express");
const {
	authPatient,
	getPatientProfile,
	registerPatient,
	updatePatientProfile,
	deletePatientProfile,
} = require("../controllers/patientController");
const { createFeedback, UpdateFeedback, getFeedback, DeleteFeedback } = require("../controllers/feedbackController");
const { createQuestion, UpdateQuestion, getQuestion, DeleteQuestion } = require("../controllers/qestionController");
const { protect } = require("../middlewares/authPatientMiddleware");
const router = express.Router();

// Routes for Patient account operations
router.route("/register").post(registerPatient);
router.route("/login").post(authPatient);
router.route("/view").get(protect, getPatientProfile);
router.route("/edit").put(protect, updatePatientProfile);
router.route("/delete").delete(protect, deletePatientProfile);

//Routes for feeback operations
router.route("/feedback/create").post(protect, createFeedback);
router.route("/feedback/update/:id").put(protect, UpdateFeedback);
router.route("/feedback/view").get(protect, getFeedback);
router.route("/feedback/delete/:id").delete(protect, DeleteFeedback);

//Routes for Q&A operations
router.route("/question/create").post(protect, createQuestion);
router.route("/question/update/:id").put(protect, UpdateQuestion);
router.route("/question/view").get(protect, getQuestion);
router.route("/question/delete/:id").delete(protect, DeleteQuestion);

module.exports = router;
