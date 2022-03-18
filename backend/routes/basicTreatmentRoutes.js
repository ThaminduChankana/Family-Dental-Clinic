const express = require("express");

const {
	getBasicTreatments,
	CreateBasicTreatment,
	getBasicTreatmentById,
	UpdateBasicTreatment,
	DeleteBasicTreatment,
} = require("../controllers/basicTreatmentController");

const { protect } = require("../middlewares/authDoctorMiddleware");
const router = express.Router();

router.route("/get").get(protect, getBasicTreatments);
router.route("/create").post(protect, CreateBasicTreatment);
router
	.route("/get/:id")
	.get(protect, getBasicTreatmentById)
	.put(protect, UpdateBasicTreatment)
	.delete(protect, DeleteBasicTreatment);

module.exports = router;
