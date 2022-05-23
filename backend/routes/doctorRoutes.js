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
	getBasicTreatmentCount,
} = require("../controllers/basicTreatmentController");
const {
	getOrthodontics,
	createOrthodontic,
	getOrthodonticById,
	updateOrthodontic,
	deleteOrthodontic,
	getOrthodonticCount,
} = require("../controllers/orthodonticController");
const {
	getFillings,
	createFilling,
	getFillingtById,
	updateFilling,
	deleteFilling,
	getFillingCount,
} = require("../controllers/fillingController");
const {
	getBlogsForEachDoctor,
	createBlog,
	getBlogById,
	UpdateBlog,
	DeleteBlog,
} = require("../controllers/blogController");
const { getMedicalHistory, getMedicalHistoryById } = require("../controllers/medicalHistoryController");
const { protect } = require("../middlewares/authDoctorMiddleware");
const router = express.Router();

//Routes for Doctor account operations by doctor
router.route("/register").post(registerDoctor);
router.route("/login").post(authDoctor);
router.route("/edit").put(protect, updateDoctorProfile);
router.route("/view").get(protect, getDoctorProfile);
router.route("/delete").delete(protect, deleteDoctorProfile);

//Routes for Patient account operations by doctor
router.route("/patients").get(protect, getPatients);
router.route("/patient/profile/view/:_id").get(protect, getPatientProfileById);

//Routes for basic treatment configuration by doctor
router.route("/treatment/basic_treatment/get").get(protect, getBasicTreatments);
router.route("/treatment/basic_treatment/get/report/").get(protect, getBasicTreatmentCount);
router.route("/treatment/basic_treatment/create").post(protect, createBasicTreatment);
router
	.route("/treatment/basic_treatment/get/:id")
	.get(protect, getBasicTreatmentById)
	.put(protect, updateBasicTreatment)
	.delete(protect, deleteBasicTreatment);

//Routes for orthodontic treatment configuration by doctor
router.route("/treatment/orthodontic/get").get(protect, getOrthodontics);
router.route("/treatment/orthodontic/get/report").get(protect, getOrthodonticCount);
router.route("/treatment/orthodontic/create").post(protect, createOrthodontic);
router
	.route("/treatment/orthodontic/get/:id")
	.get(protect, getOrthodonticById)
	.put(protect, updateOrthodontic)
	.delete(protect, deleteOrthodontic);

//Routes for filling treatment configuration by doctor
router.route("/treatment/filling/get").get(protect, getFillings);
router.route("/treatment/filling/get/report").get(protect, getFillingCount);
router.route("/treatment/filling/create").post(protect, createFilling);
router
	.route("/treatment/filling/get/:id")
	.get(protect, getFillingtById)
	.put(protect, updateFilling)
	.delete(protect, deleteFilling);

//Routes for blog management by doctor
router.route("/blogs/").get(protect, getBlogsForEachDoctor);
router.route("/blogs/create").post(protect, createBlog);
router.route("/blogs/:id").get(getBlogById).put(protect, UpdateBlog).delete(protect, DeleteBlog);

//Routes for doctors to get medical history
router.route("/medical_history").get(protect, getMedicalHistory);
router.route("/medical_history/:id").get(protect, getMedicalHistoryById);

module.exports = router;
