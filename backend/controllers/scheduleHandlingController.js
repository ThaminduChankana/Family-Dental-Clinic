const ScheduleHandling = require("../models/scheduleHandlingModel");
const asyncHandler = require("express-async-handler");

const getScheduleHandling = asyncHandler(async (req, res) => {
	const schedule = await ScheduleHandling.find();
	res.json(schedule);
});
const CreateScheduleHandling = asyncHandler(async (req, res) => {
	const { nic, name, date, time, description, addedBy } = req.body;
	if (!nic || !name || !date || !time || !description || !addedBy) {
		res.status(400);
		throw new Error("Please fill the forms");
	} else {
		const schedule = new ScheduleHandling({
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
	const scheduleHandling = await ScheduleHandling.findById(req.params.id);

	if (scheduleHandling) {
		res.json(scheduleHandling);
	} else {
		res.status(404).json({ message: "Schedule not found" });
	}
});

const UpdateScheduleHandling = asyncHandler(async (req, res) => {
	const { nic, name, date, time, description, addedBy } = req.body;

	const schedule = await ScheduleHandling.findById(req.params.id);
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
	const schedule = await ScheduleHandling.findById(req.params.id);

	if (schedule) {
		await schedule.remove();
		res.json({ message: "Schedule Removed" });
	} else {
		res.status(404);
		throw new Error("Schedule Remove Failed");
	}
});

const getScheduleCount = asyncHandler(async (req, res) => {
	const schedule = await ScheduleHandling.find({ year: new Date().getFullYear() });
	var i = 0;
	var a = 0,
		b = 0,
		c = 0,
		d = 0,
		e = 0;
	var loopData = {};
	var loopData = new Object();
	while (i < schedule.length) {
		if (schedule[i].nic === "723467893V") {
			a = a + 1;
		} else if (schedule[i].nic === "723490452V") {
			b = b + 1;
		} else if (schedule[i].nic === "719273847V") {
			c = c + 1;
		} else if (schedule[i].nic === "762938641V") {
			d = d + 1;
		} else if (schedule[i].nic === "770954352V") {
			e = e + 1;
		}
		i++;
	}
	var loopData = {
		dr_sanjeewa: a,
		dr_susith: b,
		dr_sunil: c,
		dr_namal: d,
		dr_jagath: e,
	};
	res.json(loopData);
});
module.exports = {
	getScheduleHandling,
	CreateScheduleHandling,
	getScheduleHandlingId,
	UpdateScheduleHandling,
	DeleteScheduleHandling,
	getScheduleCount,
};
