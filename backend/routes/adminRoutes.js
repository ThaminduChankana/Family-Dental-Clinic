const express = require("express");
const { registerAdmin, authAdmin, updateAdminProfile, getAdminProfile } = require("../controllers/adminController");
const {
	registerDoctor,
	getDoctors,
	getDoctorProfileById,
	deleteDoctorProfileById,
	updateDoctorProfileById,
} = require("../controllers/doctorController");
const {
	registerPatient,
	getPatients,
	getPatientProfileById,
	deletePatientProfileById,
	updatePatientProfileById,
} = require("../controllers/patientController");

const { UpdateFeedback, getFeedback, DeleteFeedback, getFeedbackById } = require("../controllers/feedbackController");
const { getQuestion, getQuestionById, UpdateQuestionforAdmin } = require("../controllers/qestionController");
const { protect } = require("../middlewares/authAdminMiddleware");
const { post } = require("./doctorRoutes");
const router = express.Router();

//Routes for Admin account operations
router.route("/register").post(registerAdmin);
router.route("/login").post(authAdmin);
router.route("/edit").put(protect, updateAdminProfile);
router.route("/view").get(protect, getAdminProfile);

//Routes for Doctor account operations admin end
router.route("/doctor/register").post(protect, registerDoctor);
router.route("/doctor/profile/view/:_id").get(protect, getDoctorProfileById).delete(protect, deleteDoctorProfileById);
router.route("/doctor/profile/edit/:_id").put(protect, updateDoctorProfileById);
router.route("/doctors").get(protect, getDoctors);

//Routes for Patient account operations admin end
router.route("/patient/register").post(protect, registerPatient);
router
	.route("/patient/profile/view/:_id")
	.get(protect, getPatientProfileById)
	.delete(protect, deletePatientProfileById);
router.route("/patient/profile/edit/:_id").put(protect, updatePatientProfileById);
router.route("/patients").get(protect, getPatients);

//Routes for feedback operations
router.route("/feedback/update/:id").put(protect, UpdateFeedback);
router.route("/feedback/view").get(protect, getFeedback);
router.route("/feedback/delete/:id").delete(protect, DeleteFeedback);
router.route("/feeback/view").get(protect, getFeedbackById);

//Routes for Q&A operations
router.route("/question/update/:id").put(protect, UpdateQuestionforAdmin);
router.route("/question/view").get(protect, getQuestion);
router.route("/question/view").get(protect, getQuestionById);

module.exports = router;
