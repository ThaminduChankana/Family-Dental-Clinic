const express = require("express");

const {
	getFillings,
	CreateFilling,
	getFillingtById,
	UpdateFilling,
	DeleteFilling,
} = require("../controllers/fillingController");
const { protect } = require("../middlewares/authDoctorMiddleware");
const router = express.Router();

router.route("/get").get(protect, getFillings);
router.route("/create").post(protect, CreateFilling);
router.route("/get/:id").get(protect, getFillingtById).put(protect, UpdateFilling).delete(protect, DeleteFilling);

module.exports = router;
