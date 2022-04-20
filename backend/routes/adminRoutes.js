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
const {
	getInventory,
	CreateInventory,
	getInventoryById,
	UpdateInventory,
	DeleteInventory,
} = require("../controllers/InventoryController");
const {
	getMedicalHistory,
	createMedicalHistory,
	getMedicalHistoryById,
	UpdateMedicalHistory,
	DeleteMedicalHistory,
} = require("../controllers/medicalHistoryController");

const {
	UpdateFeedbackforAdmin,
	deleteFeedback,
	getFeedbackById,
	getFeedbackforAdmin,
} = require("../controllers/feedbackController");

const {
	getQuestionById,
	UpdateQuestionforAdmin,
	deleteQuestion,
	getQuestionForAdmin,
} = require("../controllers/questionController");

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

//Routes for Inventory control operations
router.route("/inventory/get").get(protect, getInventory);
router.route("/inventory/create").post(protect, CreateInventory);
router
	.route("/inventory/get/:id")
	.get(protect, getInventoryById)
	.put(protect, UpdateInventory)
	.delete(protect, DeleteInventory);

//Routes for medical history management admin end
router.route("/medical_history").get(protect, getMedicalHistory);
router.route("/medical_history/create").post(protect, createMedicalHistory);
router
	.route("/medical_history/:id")
	.get(protect, getMedicalHistoryById)
	.put(protect, UpdateMedicalHistory)
	.delete(protect, DeleteMedicalHistory);

//Routes for feedback operations
router.route("/feedback/update/:id").put(protect, UpdateFeedbackforAdmin);
router.route("/feedback/view").get(protect, getFeedbackforAdmin);
router.route("/feedback/delete/:id").delete(protect, deleteFeedback);
router.route("/feedback/view/:id").get(protect, getFeedbackById);

//Routes for Q&A operations
router.route("/question/update/:id").put(protect, UpdateQuestionforAdmin);
router.route("/question/view").get(protect, getQuestionForAdmin);
router.route("/question/view/:id").get(protect, getQuestionById);
router.route("/question/delete/:id").put(protect, deleteQuestion);

module.exports = router;
