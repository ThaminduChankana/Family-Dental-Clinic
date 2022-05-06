const mongoose = require("mongoose");

const scheduleHandlingSchema = mongoose.Schema({
	// nic
	nic: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		require: true,
	},

	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	addedBy: {
		type: String,
		required: true,
	},
});

const scheduleHandling = mongoose.model("schedules", scheduleHandlingSchema);
module.exports = scheduleHandling;
