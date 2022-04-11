const express = require("express");
const { registerAdmin, authAdmin, updateAdminProfile, getAdminProfile } = require("../controllers/adminController");
const {
    registerDoctor,
    getDoctors,
    getDoctorProfileById,
    deleteDoctorProfileById,
    updateDoctorProfileById,
} = require("../controllers/doctorController");
const {
    registerPatient,
    getPatients,
    getPatientProfileById,
    deletePatientProfileById,
    updatePatientProfileById,
} = require("../controllers/patientController");
const {
    getInventory,
    CreateInventory,
    getInventoryById,
    UpdateInventory,
    DeleteInventory,
} = require("../controllers/InventoryController");

const { protect } = require("../middlewares/authAdminMiddleware");
const { post } = require("./doctorRoutes");
const router = express.Router();

//Routes for Admin account operations
router.route("/register").post(registerAdmin);
router.route("/login").post(authAdmin);
router.route("/edit").put(protect, updateAdminProfile);
router.route("/view").get(protect, getAdminProfile);

//Routes for Doctor account operations admin end
router.route("/doctor/register").post(protect, registerDoctor);
router.route("/doctor/profile/view/:_id").get(protect, getDoctorProfileById).delete(protect, deleteDoctorProfileById);
router.route("/doctor/profile/edit/:_id").put(protect, updateDoctorProfileById);
router.route("/doctors").get(protect, getDoctors);

//Routes for Patient account operations admin end
router.route("/patient/register").post(protect, registerPatient);
router
    .route("/patient/profile/view/:_id")
    .get(protect, getPatientProfileById)
    .delete(protect, deletePatientProfileById);
router.route("/patient/profile/edit/:_id").put(protect, updatePatientProfileById);
router.route("/patients").get(protect, getPatients);

//Routes for Inventory control operations
router.route("/get").get(protect, getInventory);
router.route("/create").post(protect, CreateInventory);
router.route("/get/:id").get(protect, getInventoryById).put(protect, UpdateInventory).delete(protect, DeleteInventory);

module.exports = router;