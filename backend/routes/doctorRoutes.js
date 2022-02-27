const express = require("express");
const {
	registerDoctor,
	updateDoctorProfile,
	authDoctor,
	getDoctorProfile,
	deleteDoctorProfile,
} = require("../controllers/doctorController");
const { protect } = require("../middlewares/authDoctorMiddleware");
const router = express.Router();

//Routes for Patient account operations
router.route("/register").post(registerDoctor);
router.route("/login").post(authDoctor);
router.route("/edit").put(protect, updateDoctorProfile);
router.route("/view").get(protect, getDoctorProfile);
router.route("/delete").delete(protect, deleteDoctorProfile);

module.exports = router;
