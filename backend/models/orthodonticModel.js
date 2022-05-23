const mongoose = require("mongoose");

const orthodonticSchema = mongoose.Schema(
	{
		nic: {
			type: String,
			required: true,
		},
		firstVisit: {
			type: String,
			required: true,
		},
		fullCost: {
			type: String,
			required: true,
		},
		paid: {
			type: String,
			required: true,
		},
		facialExamination: {
			type: String,
			required: true,
		},
		followUpVisits: {
			type: String,
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

const Orthodontic = mongoose.model("Orthodontic", orthodonticSchema);

module.exports = Orthodontic;
