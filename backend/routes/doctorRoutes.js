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
	createBasicTreatment,
	getBasicTreatmentById,
	updateBasicTreatment,
	deleteBasicTreatment,
} = require("../controllers/basicTreatmentController");
const {
	getOrthodontics,
	createOrthodontic,
	getOrthodonticById,
	updateOrthodontic,
	deleteOrthodontic,
} = require("../controllers/orthodonticController");
const {
	getFillings,
	createFilling,
	getFillingtById,
	updateFilling,
	deleteFilling,
} = require("../controllers/fillingController");
const { protect } = require("../middlewares/authDoctorMiddleware");
const router = express.Router();

//Routes for Doctor account operations
router.route("/register").post(registerDoctor);
router.route("/login").post(authDoctor);
router.route("/edit").put(protect, updateDoctorProfile);
router.route("/view").get(protect, getDoctorProfile);
router.route("/delete").delete(protect, deleteDoctorProfile);

router.route("/treatment/basic_treatment/get").get(getBasicTreatments);
router.route("/treatment/basic_treatment/create").post(createBasicTreatment);
router
	.route("/treatment/basic_treatment/get/:id")
	.get(getBasicTreatmentById)
	.put(updateBasicTreatment)
	.delete(deleteBasicTreatment);
router.route("/treatment/orthodontic/get").get(getOrthodontics);
router.route("/treatment/orthodontic/create").post(createOrthodontic);
router.route("/treatment/orthodontic/get/:id").get(getOrthodonticById).put(updateOrthodontic).delete(deleteOrthodontic);
router.route("/treatment/filling/get").get(getFillings);
router.route("/treatment/filling/create").post(createFilling);
router.route("/treatment/filling/get/:id").get(getFillingtById).put(updateFilling).delete(deleteFilling);

//Routes for Patient account operations
router.route("/patients").get(protect, getPatients);
router.route("/patient/profile/view/:_id").get(protect, getPatientProfileById);

module.exports = router;
