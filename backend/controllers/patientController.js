const asyncHandler = require("express-async-handler");
const Patient = require("../models/patientModel");
const {} = require("../routes/patientRoutes");
const {} = require("../routes/doctorRoutes");
const generateToken = require("../utils/generateToken");

const registerPatient = asyncHandler(async (req, res) => {
	const { name, dob, gender, nic, telephone, address, email, password, pic, referringDoctor, dataEntry, regDate } =
		req.body;

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
		email,
		password,
		pic,
		referringDoctor,
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
			email: patient.email,
			pic: patient.pic,
			referringDoctor: patient.referringDoctor,
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
			email: patient.email,
			pic: patient.pic,
			referringDoctor: patient.referringDoctor,
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
		patient.email = req.body.email || patient.email;
		patient.pic = req.body.pic || patient.pic;
		patient.referringDoctor = req.body.referringDoctor || patient.referringDoctor;
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
			email: updatedPatient.email,
			pic: updatedPatient.pic,
			referringDoctor: updatedPatient.referringDoctor,
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
		patient.email = req.body.email || patient.email;
		patient.pic = req.body.pic || patient.pic;
		patient.referringDoctor = req.body.referringDoctor || patient.referringDoctor;
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
			email: updatedPatient.email,
			pic: updatedPatient.pic,
			referringDoctor: updatedPatient.referringDoctor,
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

const getPatientCount = asyncHandler(async (req, res) => {
	const patients = await Patient.find({ year: new Date().getFullYear() });
	var z = 0;
	var a = 0,
		b = 0,
		c = 0,
		d = 0,
		e = 0;
	(f = 0), (g = 0), (h = 0), (i = 0), (j = 0), (k = 0), (l = 0);
	var loopData = {};
	var loopData = new Object();
	while (z < patients.length) {
		if (patients[z].createdAt.getMonth() + 1 === 01) {
			a = a + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 02) {
			b = b + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 03) {
			c = c + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 04) {
			d = d + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 05) {
			e = e + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 06) {
			f = f + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 07) {
			g = g + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 08) {
			h = h + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 09) {
			i = i + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 10) {
			j = j + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 11) {
			k = k + 1;
		} else if (patients[z].createdAt.getMonth() + 1 === 12) {
			l = l + 1;
		}
		z++;
	}
	var loopData = {
		january: a,
		february: b,
		march: c,
		april: d,
		may: e,
		june: f,
		july: g,
		august: h,
		september: i,
		october: j,
		november: k,
		december: l,
	};
	res.json(loopData);
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
	getPatientCount,
};
