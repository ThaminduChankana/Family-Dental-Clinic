const mongoose = require("mongoose");

const basicTreatmentSchema = mongoose.Schema(
	{
		nic: {
			type: String,
			required: true,
		},
		cost: {
			type: String,
			required: true,
		},
		treatmentType: {
			type: String,
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		checkup: {
			type: String,
		},
		procedure: {
			type: String,
			required: true,
		},
		remark: {
			type: String,
		},
		year: {
			default: new Date().getFullYear(),
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

const BasicTreatment = mongoose.model("BasicTreatment", basicTreatmentSchema);

module.exports = BasicTreatment;
