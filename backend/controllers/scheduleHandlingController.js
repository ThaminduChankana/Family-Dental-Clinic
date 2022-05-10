const scheduleHandling = require("../models/scheduleHandlingModel");
const asyncHandler = require("express-async-handler");

const getScheduleHandling = asyncHandler(async (req, res) => {
	const schedule = await scheduleHandling.find();
	res.json(schedule);
});
const CreateScheduleHandling = asyncHandler(async (req, res) => {
	const { nic, name, date, time, description, addedBy } = req.body;
	if (!nic || !name || !date || !time || !description || !addedBy) {
		res.status(400);
		throw new Error("Please fill the forms");
	} else {
		const schedule = new scheduleHandling({
			nic,
			name,
			date,
			time,
			description,
			addedBy,
		});
		const CreateScheduleHandling = await schedule.save();

		res.status(201).json(CreateScheduleHandling);
	}
});
const getScheduleHandlingId = asyncHandler(async (req, res) => {
	const scheduleHandling = await scheduleHandling.findById(res.params.id);

	if (scheduleHandling) {
		res.json(scheduleHandling);
	} else {
		res.status(404).json({ message: "Schedule not found" });
	}
});

const UpdateScheduleHandling = asyncHandler(async (req, res) => {
	const { nic, name, date, time, description, addedBy } = req.body;

	const schedule = await scheduleHandling.findById(req.params.id);
	if (schedule) {
		schedule.nic = nic;
		schedule.name = name;
		schedule.date = date;
		schedule.time = time;
		schedule.description = description;
		schedule.addedBy = addedBy;

		const UpdateScheduleHandling = await schedule.save();
		res.json(UpdateScheduleHandling);
	} else {
		res.status(404);
		throw new Error("Schedule not found");
	}
});
const DeleteScheduleHandling = asyncHandler(async (req, res) => {
	const schedule = await scheduleHandling.findById(req.params.id);

	if (schedule) {
		await schedule.remove();
		res.json({ message: "Schedule Removed" });
	} else {
		res.status(404);
		throw new Error("Schedule Remove Failed");
	}
});
module.exports = {
	getScheduleHandling,
	CreateScheduleHandling,
	getScheduleHandlingId,
	UpdateScheduleHandling,
	DeleteScheduleHandling,
};
