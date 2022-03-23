const express = require("express");
const { getMedicalHistory, getMedicalHistoryById } = require("../controllers/medicalHistoryController");
const { protect } = require("../middlewares/authDoctorMiddleware");

const router = express.Router();

router.route("/").get(protect, getMedicalHistory);
router.route("/:id").get(protect, getMedicalHistoryById);

module.exports = router;
