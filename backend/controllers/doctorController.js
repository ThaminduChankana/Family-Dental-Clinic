const asyncHandler = require("express-async-handler");
const Doctor = require("../models/doctorModel");
const {} = require("../routes/doctorRoutes");
const {} = require("../routes/patientRoutes");
const generateToken = require("../utils/generateToken");

const registerDoctor = asyncHandler(async (req, res) => {
	const {
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		email,
		sldaReg,
		licenceNo,
		currentHospital,
		password,
		pic,
		dataEntry,
		regDate,
	} = req.body;

	const doctorExists = await Doctor.findOne({ nic });
	if (doctorExists) {
		res.status(400);
		throw new Error("Doctor Profile Exists !");
	}

	const doctor = await Doctor.create({
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		email,
		sldaReg,
		licenceNo,
		currentHospital,
		password,
		pic,
		dataEntry,
		regDate,
	});

	if (doctor) {
		res.status(201).json({
			_id: doctor._id,
			name: doctor.name,
			isAdmin: doctor.isAdmin,
			dob: doctor.dob,
			gender: doctor.gender,
			nic: doctor.nic,
			telephone: doctor.telephone,
			address: doctor.address,
			email: doctor.email,
			sldaReg: doctor.sldaReg,
			licenceNo: doctor.licenceNo,
			currentHospital: doctor.currentHospital,
			pic: doctor.pic,
			dataEntry: doctor.dataEntry,
			regDate: doctor.regDate,
			token: generateToken(doctor._id),
		});
	} else {
		res.status(400);
		throw new Error("Error Occurred!");
	}
});
const authDoctor = asyncHandler(async (req, res) => {
	const { nic, password } = req.body;

	const doctor = await Doctor.findOne({ nic });
	if (doctor && (await doctor.matchPassword(password))) {
		res.json({
			_id: doctor._id,
			name: doctor.name,
			isAdmin: doctor.isAdmin,
			dob: doctor.dob,
			gender: doctor.gender,
			nic: doctor.nic,
			telephone: doctor.telephone,
			address: doctor.address,
			email: doctor.email,
			sldaReg: doctor.sldaReg,
			licenceNo: doctor.licenceNo,
			currentHospital: doctor.currentHospital,
			pic: doctor.pic,
			dataEntry: doctor.dataEntry,
			regDate: doctor.regDate,
			token: generateToken(doctor._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid NIC or Password!");
	}
});
const getDoctors = asyncHandler(async (req, res) => {
	const doctors = await Doctor.find();
	res.json(doctors);
});

const getDoctorProfile = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.doctor._id);

	if (doctor) {
		res.json(doctor);
	} else {
		res.status(404).json({ message: "Doctor not found" });
	}
});

const getDoctorProfileById = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.params._id);
	if (doctor) {
		res.json(doctor);
	} else {
		res.status(404).json({ message: "Doctor not found" });
	}
});
const updateDoctorProfile = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.doctor._id);

	if (doctor) {
		doctor.name = req.body.name || doctor.name;
		doctor.dob = req.body.dob || doctor.dob;
		doctor.gender = req.body.gender || doctor.gender;
		doctor.nic = req.body.nic || doctor.nic;
		doctor.telephone = req.body.telephone || doctor.telephone;
		doctor.address = req.body.address || doctor.address;
		doctor.email = req.body.email || doctor.email;
		doctor.sldaReg = req.body.sldaReg || doctor.sldaReg;
		doctor.licenceNo = req.body.licenceNo || doctor.licenceNo;
		doctor.currentHospital = req.body.currentHospital || doctor.currentHospital;
		doctor.pic = req.body.pic || doctor.pic;
		doctor.dataEntry = req.body.dataEntry || doctor.dataEntry;
		if (req.body.password) {
			doctor.password = req.body.password;
		}

		const updatedDoctor = await doctor.save();

		res.json({
			_id: updatedDoctor._id,
			name: updatedDoctor.name,
			isAdmin: updatedDoctor.isAdmin,
			dob: updatedDoctor.dob,
			gender: updatedDoctor.gender,
			nic: updatedDoctor.nic,
			telephone: updatedDoctor.telephone,
			address: updatedDoctor.address,
			email: updatedDoctor.email,
			sldaReg: updatedDoctor.sldaReg,
			licenceNo: updatedDoctor.licenceNo,
			currentHospital: updatedDoctor.currentHospital,
			pic: updatedDoctor.pic,
			dataEntry: updatedDoctor.dataEntry,
			regDate: updatedDoctor.regDate,
			token: generateToken(updatedDoctor._id),
		});
	} else {
		res.status(404);
		throw new Error("Doctor Not Found");
	}
});

const updateDoctorProfileById = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.params._id);

	if (doctor) {
		doctor.name = req.body.name || doctor.name;
		doctor.dob = req.body.dob || doctor.dob;
		doctor.gender = req.body.gender || doctor.gender;
		doctor.nic = req.body.nic || doctor.nic;
		doctor.telephone = req.body.telephone || doctor.telephone;
		doctor.address = req.body.address || doctor.address;
		doctor.email = req.body.email || doctor.email;
		doctor.sldaReg = req.body.sldaReg || doctor.sldaReg;
		doctor.licenceNo = req.body.licenceNo || doctor.licenceNo;
		doctor.currentHospital = req.body.currentHospital || doctor.currentHospital;
		doctor.pic = req.body.pic || doctor.pic;
		doctor.dataEntry = req.body.dataEntry || doctor.dataEntry;
		if (req.body.password) {
			doctor.password = req.body.password;
		}

		const updatedDoctor = await doctor.save();

		res.json({
			_id: updatedDoctor._id,
			name: updatedDoctor.name,
			isAdmin: updatedDoctor.isAdmin,
			dob: updatedDoctor.dob,
			gender: updatedDoctor.gender,
			nic: updatedDoctor.nic,
			telephone: updatedDoctor.telephone,
			address: updatedDoctor.address,
			email: updatedDoctor.email,
			sldaReg: updatedDoctor.sldaReg,
			licenceNo: updatedDoctor.licenceNo,
			currentHospital: updatedDoctor.currentHospital,
			pic: updatedDoctor.pic,
			dataEntry: updatedDoctor.dataEntry,
			regDate: updatedDoctor.regDate,
			token: generateToken(updatedDoctor._id),
		});
	} else {
		res.status(404);
		throw new Error("Doctor Not Found");
	}
});

const deleteDoctorProfile = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.doctor._id);

	if (doctor) {
		await doctor.remove();
		res.json({ message: "Doctor Account Removed" });
	} else {
		res.status(404);
		throw new Error("Doctor Account not Found");
	}
});

const deleteDoctorProfileById = asyncHandler(async (req, res) => {
	const doctor = await Doctor.findById(req.params._id);

	if (doctor) {
		await doctor.remove();
		res.json({ message: "Doctor Account Removed" });
	} else {
		res.status(404);
		throw new Error("Doctor Account not Found");
	}
});

module.exports = {
	getDoctorProfile,
	getDoctorProfileById,
	getDoctors,
	registerDoctor,
	updateDoctorProfile,
	updateDoctorProfileById,
	deleteDoctorProfile,
	deleteDoctorProfileById,
	authDoctor,
};
