const mongoose = require("mongoose");

const orthodonticSchema = mongoose.Schema({
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
		required: true,
	},
	remark: {
		type: String,
	},
});

const Orthodontic = mongoose.model("Orthodontic", orthodonticSchema);

module.exports = Orthodontic;
