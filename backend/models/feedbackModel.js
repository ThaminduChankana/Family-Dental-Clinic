const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const feedbackSchema = new mongoose.Schema(
	{
		//name, patient_email, review_description, rating_count,
		name: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		patient_email: {
			type: String,
			required: true,
			unique: true,
		},

		review_description: {
			type: String,
			required: true,
		},
		rating_count: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

const feedback = mongoose.model("feedback", feedbackSchema);

module.exports = feedback;
