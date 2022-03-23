const express = require("express");
const { getMedicalHistoryById } = require("../controllers/medicalHistoryController");
const { protect } = require("../middlewares/authPatientMiddleware");

const router = express.Router();

router.route("/:id").get(protect, getMedicalHistoryById);

module.exports = router;
