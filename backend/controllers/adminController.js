const asyncHandler = require("express-async-handler");
const Admin = require("../models/adminModel");
const {} = require("../routes/adminRoutes");
const {} = require("../routes/doctorRoutes");
const {} = require("../routes/patientRoutes");
const generateToken = require("../utils/generateToken");

const registerAdmin = asyncHandler(async (req, res) => {
	const { name, dob, nic, telephone, address, email, previousRef, password, pic, dataEntry } = req.body;

	const adminExists = await Admin.findOne({ nic });
	if (adminExists) {
		res.status(400);
		throw new Error("Admin Profile Exists !");
	}

	const admin = await Admin.create({
		name,
		dob,
		nic,
		telephone,
		address,
		email,
		previousRef,
		password,
		pic,
		dataEntry,
	});

	if (admin) {
		res.status(201).json({
			_id: admin._id,
			name: admin.name,
			isAdmin: admin.isAdmin,
			dob: admin.dob,
			nic: admin.nic,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			previousRef: admin.previousRef,
			pic: admin.pic,
			dataEntry: admin.dataEntry,
			token: generateToken(admin._id),
		});
	} else {
		res.status(400);
		throw new Error("Error Occurred!");
	}
});

const authAdmin = asyncHandler(async (req, res) => {
	const { nic, password } = req.body;

	const admin = await Admin.findOne({ nic });
	if (admin && (await admin.matchPassword(password))) {
		res.json({
			_id: admin._id,
			name: admin.name,
			isAdmin: admin.isAdmin,
			dob: admin.dob,
			nic: admin.nic,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			previousRef: admin.previousRef,
			pic: admin.pic,
			dataEntry: admin.dataEntry,
			token: generateToken(admin._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid NIC or Password!");
	}
});

const updateAdminProfile = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.admin._id);

	if (admin) {
		admin.name = req.body.name || admin.name;
		admin.dob = req.body.dob || admin.dob;
		admin.nic = req.body.nic || admin.nic;
		admin.telephone = req.body.telephone || admin.telephone;
		admin.address = req.body.address || admin.address;
		admin.email = req.body.email || admin.email;
		admin.previousRef = req.body.previousRef || admin.previousRef;
		admin.pic = req.body.pic || admin.pic;
		admin.dataEntry = req.body.dataEntry || admin.dataEntry;
		if (req.body.password) {
			admin.password = req.body.password;
		}

		const updatedAdmin = await admin.save();

		res.json({
			_id: updatedAdmin._id,
			name: updatedAdmin.name,
			isAdmin: updatedAdmin.isAdmin,
			dob: updatedAdmin.dob,
			nic: updatedAdmin.nic,
			telephone: updatedAdmin.telephone,
			address: updatedAdmin.address,
			email: updatedAdmin.email,
			previousRef: updatedAdmin.previousRef,
			pic: updatedAdmin.pic,
			dataEntry: updatedAdmin.dataEntry,
			token: generateToken(updatedAdmin._id),
		});
	} else {
		res.status(404);
		throw new Error("Admin Not Found");
	}
});
const getAdminProfile = asyncHandler(async (req, res) => {
	const admin = await Admin.findById(req.admin._id);

	if (admin) {
		res.json({
			name: admin.name,
			dob: admin.dob,
			nic: admin.nic,
			telephone: admin.telephone,
			address: admin.address,
			email: admin.email,
			previousRef: admin.previousRef,
			pic: admin.pic,
			dataEntry: admin.dataEntry,
		});
	} else {
		res.status(404).json({ message: "Admin not found" });
	}
});

module.exports = {
	registerAdmin,
	authAdmin,
	updateAdminProfile,
	getAdminProfile,
};
