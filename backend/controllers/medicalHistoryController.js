const MedicalHistory = require("../models/medicalHistoryModel");
const Patient = require("../models/patientModel");
const asyncHandler = require("express-async-handler");

const getMedicalHistory = asyncHandler(async (req, res) => {
	const medicalHistory = await MedicalHistory.find();
	res.json(medicalHistory);
});

const getMedicalHistoryForEachPatient = asyncHandler(async (req, res) => {
	const patient = await Patient.findById(req.params.id);

	const medicalHistory = await MedicalHistory.findOne({ nic: patient.nic });

	res.json(medicalHistory);
});

const getMedicalHistoryCount = asyncHandler(async (req, res) => {
	const medicalHistory = await MedicalHistory.find({ year: new Date().getFullYear() });
	var i = 0;
	var a = 0,
		b = 0,
		c = 0,
		d = "";
	var loopData = {};
	var loopData = new Object();
	while (i < medicalHistory.length) {
		if (medicalHistory[i].medicalConcerns === "High blood pressure") {
			a = a + 1;
		} else if (medicalHistory[i].medicalConcerns === "Heart disease") {
			b = b + 1;
		} else if (medicalHistory[i].medicalConcerns === "Diabetes") {
			c = c + 1;
		}
		i++;
	}
	if (a > b && a > c) {
		d = "High blood pressure";
	} else if (b > a && b > c) {
		d = "Heart disease";
	} else if (c > a && c > b) {
		d = "Diabetes";
	}
	var loopData = {
		high_blood_pressure: a,
		heart_disease: b,
		diabetes: c,
		max: d,
	};
	res.json(loopData);
});

const createMedicalHistory = asyncHandler(async (req, res) => {
	const {
		nic,
		pname,
		previousDentalhistory,
		dentalConcerns,
		medicalConcerns,
		currentMedications,
		otherDiseases,
		vaccinations,
		covidDiagnose,
		fluSymptoms,
		covidConfirmation,
	} = req.body;

	if (
		!nic ||
		!pname ||
		!previousDentalhistory ||
		!dentalConcerns ||
		!medicalConcerns ||
		!currentMedications ||
		!otherDiseases ||
		!vaccinations ||
		!covidDiagnose ||
		!fluSymptoms ||
		!covidConfirmation
	) {
		res.status(400);
		throw new Error("Please fill all the fields");
	} else {
		const medicalhistory = new MedicalHistory({
			nic,
			pname,
			previousDentalhistory,
			dentalConcerns,
			medicalConcerns,
			currentMedications,
			otherDiseases,
			vaccinations,
			covidDiagnose,
			fluSymptoms,
			covidConfirmation,
		});

		const createMedicalHistory = await medicalhistory.save();

		res.status(201).json(createMedicalHistory);
	}
});

const getMedicalHistoryById = asyncHandler(async (req, res) => {
	const medicalhistory = await MedicalHistory.findById(req.params.id);

	if (medicalhistory) {
		res.json(medicalhistory);
	} else {
		res.status(404).json({ message: "Medical History not found" });
	}
});

const UpdateMedicalHistory = asyncHandler(async (req, res) => {
	const {
		nic,
		pname,
		previousDentalhistory,
		dentalConcerns,
		medicalConcerns,
		currentMedications,
		otherDiseases,
		vaccinations,
		covidDiagnose,
		fluSymptoms,
		covidConfirmation,
	} = req.body;

	const medicalhistory = await MedicalHistory.findById(req.params.id);

	if (medicalhistory) {
		medicalhistory.nic = nic;
		medicalhistory.pname = pname;
		medicalhistory.previousDentalhistory = previousDentalhistory;
		medicalhistory.dentalConcerns = dentalConcerns;
		medicalhistory.medicalConcerns = medicalConcerns;
		medicalhistory.currentMedications = currentMedications;
		medicalhistory.otherDiseases = otherDiseases;
		medicalhistory.vaccinations = vaccinations;
		medicalhistory.covidDiagnose = covidDiagnose;
		medicalhistory.fluSymptoms = fluSymptoms;
		medicalhistory.covidConfirmation = covidConfirmation;

		const updateMedicalHistory = await medicalhistory.save();
		res.json(updateMedicalHistory);
	} else {
		res.status(404);
		throw new Error("Medical History not found");
	}
});

const DeleteMedicalHistory = asyncHandler(async (req, res) => {
	const medicalhistory = await MedicalHistory.findById(req.params.id);

	if (medicalhistory) {
		await medicalhistory.remove();
		res.json({ message: "Medical History removed" });
	} else {
		res.status(404);
		throw new Error("Medical History not found");
	}
});
module.exports = {
	getMedicalHistory,
	createMedicalHistory,
	getMedicalHistoryById,
	UpdateMedicalHistory,
	DeleteMedicalHistory,
	getMedicalHistoryForEachPatient,
	getMedicalHistoryCount,
};
