const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
	{
		//name, email, question_type, question_description,
		name: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: String,
			required: true,
			default: "false",
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
	},
	{
		timestamps: true,
	}
);

const question = mongoose.model("question", questionSchema);

module.exports = question;
