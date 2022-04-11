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
const { getBlogs, createBlog, getBlogById, UpdateBlog, DeleteBlog } = require("../controllers/blogController");
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
router.route("/treatment/basic_treatment/create").post(protect, CreateBasicTreatment);
router
	.route("/treatment/basic_treatment/get/:id")
	.get(protect, getBasicTreatmentById)
	.put(protect, UpdateBasicTreatment)
	.delete(protect, DeleteBasicTreatment);

//Routes for orthodontic treatment configuration by doctor
router.route("/treatment/orthodontic/get").get(protect, getOrthodontics);
router.route("/treatment/orthodontic/create").post(protect, CreateOrthodontic);
router
	.route("/treatment/orthodontic/get/:id")
	.get(protect, getOrthodonticById)
	.put(protect, UpdateOrthodontic)
	.delete(protect, DeleteOrthodontic);

//Routes for filling treatment configuration by doctor
router.route("/treatment/filling/get").get(protect, getFillings);
router.route("/treatment/filling/create").post(protect, CreateFilling);
router
	.route("/treatment/filling/get/:id")
	.get(protect, getFillingtById)
	.put(protect, UpdateFilling)
	.delete(protect, DeleteFilling);

//Routes for blog management by doctor
router.route("/blogs/").get(protect, getBlogs);
router.route("/blogs/create").post(protect, createBlog);
router.route("/blogs/:id").get(getBlogById).put(protect, UpdateBlog).delete(protect, DeleteBlog);

//Routes for doctors to get medical history
router.route("/medical_history").get(protect, getMedicalHistory);
router.route("/medical_history/:id").get(protect, getMedicalHistoryById);

module.exports = router;
