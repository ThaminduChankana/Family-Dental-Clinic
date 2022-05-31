const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const patientSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		isAdmin: {
			type: Boolean,
			required: true,
			default: false,
		},
		dob: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		nic: {
			type: String,
			required: true,
			unique: true,
		},
		telephone: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		pic: {
			type: String,
			required: true,
			default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
		},
		referringDoctor: {
			type: String,
			required: true,
		},
		dataEntry: {
			type: String,
			required: true,
		},
		regDate: {
			type: String,
			required: true,
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
patientSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

patientSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;
