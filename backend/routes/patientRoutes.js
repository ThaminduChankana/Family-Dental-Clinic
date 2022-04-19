const express = require("express");
const {
	authPatient,
	getPatientProfile,
	registerPatient,
	updatePatientProfile,
	deletePatientProfile,
} = require("../controllers/patientController");
const { getMedicalHistoryById } = require("../controllers/medicalHistoryController");
const { protect } = require("../middlewares/authPatientMiddleware");
const { 
	createAppointment, 
	getAppointments, 
	deleteAppointment,
	updateAppointment 
} = require("../controllers/appointmentController");
const router = express.Router();

// Routes for Patient account operations
router.route("/register").post(registerPatient);
router.route("/login").post(authPatient);
router.route("/view").get(protect, getPatientProfile);
router.route("/edit").put(protect, updatePatientProfile);
router.route("/delete").delete(protect, deletePatientProfile);

//Routes for patient to get medical history
router.route("/medical_history/:id").get(protect, getMedicalHistoryById);

// Routes for appointment management
router.route("/appointment/").get(protect, getAppointments);
router.route("/appointment/").post(protect, createAppointment);
router.route("/appointment/:id").put(protect, updateAppointment);
router.route("/appointment/:id").delete(protect, deleteAppointment);

module.exports = router;
