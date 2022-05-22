const mongoose = require("mongoose");

const fillingSchema = mongoose.Schema(
	{
		nic: {
			type: String,
			required: true,
		},
		cost: {
			type: String,
			required: true,
		},
		fillingMaterial: {
			type: String,
			required: true,
		},
		fillingType: {
			type: String,
			required: true,
		},
		anestheticStatus: {
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

const Filling = mongoose.model("Filling", fillingSchema);

module.exports = Filling;
