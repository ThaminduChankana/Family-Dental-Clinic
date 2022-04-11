const express = require("express");
const {
	authPatient,
	getPatientProfile,
	registerPatient,
	updatePatientProfile,
	deletePatientProfile,
} = require("../controllers/patientController");

const {
	createFeedback,
	UpdateFeedback,
	getFeedback,
	DeleteFeedback,
	getFeedbackById,
} = require("../controllers/feedbackController");
const {
	createQuestion,
	UpdateQuestion,
	getQuestion,
	getQuestionById,
	DeleteQuestion,
} = require("../controllers/qestionController");

const { getMedicalHistoryById } = require("../controllers/medicalHistoryController");

const { protect } = require("../middlewares/authPatientMiddleware");
const router = express.Router();

// Routes for Patient account operations
router.route("/register").post(registerPatient);
router.route("/login").post(authPatient);
router.route("/view").get(protect, getPatientProfile);
router.route("/edit").put(protect, updatePatientProfile);
router.route("/delete").delete(protect, deletePatientProfile);

//Routes for feedback operations
router.route("/feedback/create").post(protect, createFeedback);
router.route("/feedback/update/:id").put(protect, UpdateFeedback);
router.route("/feedback/view/:id").get(protect, getFeedbackById);
router.route("/feedback/view").get(protect, getFeedback);
router.route("/feedback/delete/:id").delete(protect, DeleteFeedback);

//Routes for Q&A operations
router.route("/question/create").post(protect, createQuestion);
router.route("/question/update/:id").put(protect, UpdateQuestion);
router.route("/question/view").get(protect, getQuestion);
router.route("/question/view/:id").get(protect, getQuestionById);
router.route("/question/delete/:id").delete(protect, DeleteQuestion);

//Routes for patient to get medical history
router.route("/medical_history/:id").get(protect, getMedicalHistoryById);

module.exports = router;
