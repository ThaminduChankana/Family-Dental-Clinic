const mongoose = require("mongoose");

const medicalHistorySchema = mongoose.Schema({
	nic: {
		type: String,
		required: true,
	},
	pname: {
		type: String,
		required: true,
	},
	previousDentalhistory: {
		type: String,
		required: true,
	},
	dentalConcerns: {
		type: String,
		required: true,
	},
	medicalConcerns: {
		type: String,
		required: true,
	},
	currentMedications: {
		type: String,
		required: true,
	},
	otherDiseases: {
		type: String,
		required: true,
	},
	vaccinations: {
		type: String,
		required: true,
	},
	covidDiagnose: {
		type: String,
		required: true,
	},
	fluSymptoms: {
		type: String,
		required: true,
	},
	covidConfirmation: {
		type: String,
		required: true,
	},
	year: {
		default: new Date().getFullYear(),
		type: String,
	},
});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

module.exports = MedicalHistory;
