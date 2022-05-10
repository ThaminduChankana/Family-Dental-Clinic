const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
	{
		//name, email, question_type, question_description, answer
		name: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: String,
			required: true,
			default: false,
		},
		email: {
			type: String,
			required: true,
		},

		question_type: {
			type: String,
			required: true,
		},
		question_description: {
			type: String,
			required: true,
		},
		answer: {
			type: String,
			default: null,
		},
	},
	{
		timestamps: true,
	}
);

const question = mongoose.model("question", questionSchema);

module.exports = question;
