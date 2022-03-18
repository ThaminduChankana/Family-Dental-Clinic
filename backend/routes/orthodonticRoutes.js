const express = require("express");

const {
	getOrthodontics,
	CreateOrthodontic,
	getOrthodonticById,
	UpdateOrthodontic,
	DeleteOrthodontic,
} = require("../controllers/orthodonticController");
const { protect } = require("../middlewares/authDoctorMiddleware");
const router = express.Router();

router.route("/get").get(protect, getOrthodontics);
router.route("/create").post(protect, CreateOrthodontic);
router
	.route("/get/:id")
	.get(protect, getOrthodonticById)
	.put(protect, UpdateOrthodontic)
	.delete(protect, DeleteOrthodontic);

module.exports = router;
