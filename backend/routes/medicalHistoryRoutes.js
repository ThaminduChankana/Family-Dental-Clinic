const express = require("express");
const {
	getMedicalHistory,
	createMedicalHistory,
	getMedicalHistoryById,
	UpdateMedicalHistory,
	DeleteMedicalHistory,
} = require("../controllers/medicalHistoryController");
const { protect } = require("../middlewares/authAdminMiddleware");

const router = express.Router();

router.route("/").get(protect, getMedicalHistory);
router.route("/create").post(protect, createMedicalHistory);
router
	.route("/:id")
	.get(protect, getMedicalHistoryById)
	.put(protect, UpdateMedicalHistory)
	.delete(protect, DeleteMedicalHistory);

module.exports = router;
