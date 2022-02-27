const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const {} = require("../routes/patientRoutes");
const generateToken = require("../utils/generateToken");

const registerPatient = asyncHandler(async (req, res) => {
	//Name, dob,gender,nic,telephone,address,password,pic,dataentry,reg date
	const { name, dob, gender, nic, telephone, address, password, pic, dataEntry, regDate } = req.body;

	const patientExists = await Patient.findOne({ nic });
	if (patientExists) {
		res.status(400);
		throw new Error("Patient Profile Exists !");
	}

	const patient = await Patient.create({
		name,
		dob,
		gender,
		nic,
		telephone,
		address,
		password,
		pic,
		dataEntry,
		regDate,
	});

	if (patient) {
		res.status(201).json({
			_id: patient._id,
			name: patient.name,
			isAdmin: patient.isAdmin,
			dob: patient.dob,
			gender: patient.gender,
			nic: patient.nic,
			telephone: patient.telephone,
			address: patient.address,
			pic: patient.pic,
			dataEntry: patient.dataEntry,
			regDate: patient.regDate,
			token: generateToken(patient._id),
		});
	} else {
		res.status(400);
		throw new Error("Error Occurred!");
	}
});
const authPatient = asyncHandler(async (req, res) => {
	const { nic, password } = req.body;

	const patient = await Patient.findOne({ nic });
	if (patient && (await patient.matchPassword(password))) {
		res.json({
			_id: patient._id,
			name: patient.name,
			isAdmin: patient.isAdmin,
			dob: patient.dob,
			gender: patient.gender,
			nic: patient.nic,
			telephone: patient.telephone,
			address: patient.address,
			pic: patient.pic,
			dataEntry: patient.dataEntry,
			regDate: patient.regDate,
			token: generateToken(patient._id),
		});
	} else {
		res.status(400);
		throw new Error("Invalid NIC or Password!");
	}
});
const getPatients = asyncHandler(async (req, res) => {
	const patients = await Patient.find();
	res.json(patients);
});

const getPatientProfile = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.patient._id);

	if (patient) {
		res.json(patient);
	} else {
		res.status(404).json({ message: "Patient not found" });
	}
});
const getPatientProfileById = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.params._id);

	if (patient) {
		res.json(patient);
	} else {
		res.status(404).json({ message: "Patient not found" });
	}
});

const updatePatientProfile = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.patient._id);

	if (patient) {
		patient.name = req.body.name || patient.name;
		patient.dob = req.body.dob || patient.dob;
		patient.gender = req.body.gender || patient.gender;
		patient.nic = req.body.nic || patient.nic;
		patient.telephone = req.body.telephone || patient.telephone;
		patient.address = req.body.address || patient.address;
		patient.pic = req.body.pic || patient.pic;
		patient.dataEntry = req.body.dataEntry || patient.dataEntry;
		if (req.body.password) {
			patient.password = req.body.password;
		}

		const updatedPatient = await patient.save();

		res.json({
			_id: updatedPatient._id,
			name: updatedPatient.name,
			isAdmin: updatedPatient.isAdmin,
			dob: updatedPatient.dob,
			gender: updatedPatient.gender,
			nic: updatedPatient.nic,
			telephone: updatedPatient.telephone,
			address: updatedPatient.address,
			pic: updatedPatient.pic,
			dataEntry: updatedPatient.dataEntry,
			regDate: updatedPatient.regDate,
			token: generateToken(updatedPatient._id),
		});
	} else {
		res.status(404);
		throw new Error("Patient Not Found");
	}
});

const updatePatientProfileById = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.params._id);

	if (patient) {
		patient.name = req.body.name || patient.name;
		patient.dob = req.body.dob || patient.dob;
		patient.gender = req.body.gender || patient.gender;
		patient.nic = req.body.nic || patient.nic;
		patient.telephone = req.body.telephone || patient.telephone;
		patient.address = req.body.address || patient.address;
		patient.pic = req.body.pic || patient.pic;
		patient.dataEntry = req.body.dataEntry || patient.dataEntry;
		if (req.body.password) {
			patient.password = req.body.password;
		}

		const updatedPatient = await patient.save();

		res.json({
			_id: updatedPatient._id,
			name: updatedPatient.name,
			isAdmin: updatedPatient.isAdmin,
			dob: updatedPatient.dob,
			gender: updatedPatient.gender,
			nic: updatedPatient.nic,
			telephone: updatedPatient.telephone,
			address: updatedPatient.address,
			pic: updatedPatient.pic,
			dataEntry: updatedPatient.dataEntry,
			regDate: updatedPatient.regDate,
			token: generateToken(updatedPatient._id),
		});
	} else {
		res.status(404);
		throw new Error("Patient Not Found");
	}
});

const deletePatientProfile = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.patient._id);

	if (patient) {
		await patient.remove();
		res.json({ message: "Patient Account Removed" });
	} else {
		res.status(404);
		throw new Error("Patient Account not Found");
	}
});

const deletePatientProfileById = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.params._id);

	if (patient) {
		await patient.remove();
		res.json({ message: "Patient Account Removed" });
	} else {
		res.status(404);
		throw new Error("Patient Account not Found");
	}
});

module.exports = {
	getPatientProfile,
	getPatientProfileById,
	getPatients,
	registerPatient,
	updatePatientProfile,
	updatePatientProfileById,
	deletePatientProfile,
	deletePatientProfileById,
	authPatient,
};
