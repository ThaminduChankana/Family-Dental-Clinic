const MedicalHistory = require("../models/medicalHistoryModel");

const asyncHandler = require("express-async-handler");

const getMedicalHistory = asyncHandler(async (req, res) => {
	const medicalHistory = await MedicalHistory.find();
	res.json(medicalHistory);
});

const createMedicalHistory = asyncHandler(async (req, res) => {
	const {
		nic,
		pname,
		previousDentalhistory,
		dname,
		lastVisit,
		lastCleaning,
		dentalConcerns,
		medicalConcerns,
		currentMedications,
		otherConcerns1,
		vaccinations,
		otherConcerns2,
		otherConcerns3,
		otherConcerns4,
	} = req.body;

	if (
		!nic ||
		!pname ||
		!previousDentalhistory ||
		!dname ||
		!lastVisit ||
		!lastCleaning ||
		!dentalConcerns ||
		!medicalConcerns ||
		!currentMedications ||
		!otherConcerns1 ||
		!vaccinations ||
		!otherConcerns2 ||
		!otherConcerns3 ||
		!otherConcerns4
	) {
		res.status(400);
		throw new Error("Please fill all the fields");
	} else {
		const medicalhistory = new MedicalHistory({
			nic,
			pname,
			previousDentalhistory,
			dname,
			lastVisit,
			lastCleaning,
			dentalConcerns,
			medicalConcerns,
			currentMedications,
			otherConcerns1,
			vaccinations,
			otherConcerns2,
			otherConcerns3,
			otherConcerns4,
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
		dname,
		lastVisit,
		lastCleaning,
		dentalConcerns,
		medicalConcerns,
		currentMedications,
		otherConcerns1,
		vaccinations,
		otherConcerns2,
		otherConcerns3,
		otherConcerns4,
	} = req.body;

	const medicalhistory = await MedicalHistory.findById(req.params.id);

	if (medicalhistory) {
		medicalhistory.nic = nic;
		medicalhistory.pname = pname;
		medicalhistory.previousDentalhistory = previousDentalhistory;
		medicalhistory.dname = dname;
		medicalhistory.lastVisit = lastVisit;
		medicalhistory.lastCleaning = lastCleaning;
		medicalhistory.dentalConcerns = dentalConcerns;
		medicalhistory.medicalConcerns = medicalConcerns;
		medicalhistory.currentMedications = currentMedications;
		medicalhistory.otherConcerns1 = otherConcerns1;
		medicalhistory.vaccinations = vaccinations;
		medicalhistory.otherConcerns2 = otherConcerns2;
		medicalhistory.otherConcerns3 = otherConcerns3;
		medicalhistory.otherConcerns4 = otherConcerns4;

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
};
