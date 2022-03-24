const express = require("express");
const {
	registerDoctor,
	updateDoctorProfile,
	authDoctor,
	getDoctorProfile,
	deleteDoctorProfile,
} = require("../controllers/doctorController");
const { getPatients, getPatientProfileById } = require("../controllers/patientController");
const {
	getBasicTreatments,
	CreateBasicTreatment,
	getBasicTreatmentById,
	UpdateBasicTreatment,
	DeleteBasicTreatment,
} = require("../controllers/basicTreatmentController");
const {
	getOrthodontics,
	CreateOrthodontic,
	getOrthodonticById,
	UpdateOrthodontic,
	DeleteOrthodontic,
} = require("../controllers/orthodonticController");
const {
	getFillings,
	CreateFilling,
	getFillingtById,
	UpdateFilling,
	DeleteFilling,
} = require("../controllers/fillingController");
const { protect } = require("../middlewares/authDoctorMiddleware");
const router = express.Router();

//Routes for Doctor account operations
router.route("/register").post(registerDoctor);
router.route("/login").post(authDoctor);
router.route("/edit").put(protect, updateDoctorProfile);
router.route("/view").get(protect, getDoctorProfile);
router.route("/delete").delete(protect, deleteDoctorProfile);

router.route("/treatment/basic-treatment/get").get(protect, getBasicTreatments);
router.route("/treatment/basic-treatment/create").post(protect, CreateBasicTreatment);
router
	.route("/treatment/basic-treatment/get/:id")
	.get(protect, getBasicTreatmentById)
	.put(protect, UpdateBasicTreatment)
	.delete(protect, DeleteBasicTreatment);
router.route("/treatment/orthodontic/get").get(protect, getOrthodontics);
router.route("/treatment/orthodontic/create").post(protect, CreateOrthodontic);
router
	.route("/treatment/orthodontic/get/:id")
	.get(protect, getOrthodonticById)
	.put(protect, UpdateOrthodontic)
	.delete(protect, DeleteOrthodontic);
router.route("/treatment/filling/get").get(protect, getFillings);
router.route("/treatment/filling/create").post(protect, CreateFilling);
router
	.route("/treatment/filling/get/:id")
	.get(protect, getFillingtById)
	.put(protect, UpdateFilling)
	.delete(protect, DeleteFilling);

//Routes for Patient account operations
router.route("/patients").get(protect, getPatients);
router.route("/patient/profile/view/:_id").get(protect, getPatientProfileById);

module.exports = router;
