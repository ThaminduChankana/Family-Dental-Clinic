const express = require("express");
const {
	authPatient,
	getPatientProfile,
	registerPatient,
	updatePatientProfile,
	deletePatientProfile,
} = require("../controllers/patientController");
const { protect } = require("../middlewares/authPatientMiddleware");
const router = express.Router();

// Routes for Patient account operations
router.route("/register").post(registerPatient);
router.route("/login").post(authPatient);
router.route("/view").get(protect, getPatientProfile);
router.route("/edit").put(protect, updatePatientProfile);
router.route("/delete").delete(protect, deletePatientProfile);

module.exports = router;
