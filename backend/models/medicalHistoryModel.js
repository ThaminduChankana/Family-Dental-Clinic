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
	},
	dentalConcerns: {
		type: String,
	},
	medicalConcerns: {
		type: String,
	},
	currentMedications: {
		type: String,
	},
	otherDiseases: {
		type: String,
	},
	vaccinations: {
		type: String,
		required: true,
	},
	covidDiagnose: {
		type: String,
	},
	fluSymptoms: {
		type: String,
	},
	covidConfirmation: {
		type: String,
	},
});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

module.exports = MedicalHistory;
