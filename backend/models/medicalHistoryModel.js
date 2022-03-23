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
	dname: {
		type: String,
		required: true,
	},
	lastVisit: {
		type: Date,
	},
	lastCleaning: {
		type: Date,
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
	otherConcerns1: {
		type: String,
	},
	vaccinations: {
		type: String,
		required: true,
	},
	otherConcerns2: {
		type: String,
	},
	otherConcerns3: {
		type: String,
	},
	otherConcerns4: {
		type: String,
	},
});

const MedicalHistory = mongoose.model("MedicalHistory", medicalHistorySchema);

module.exports = MedicalHistory;
