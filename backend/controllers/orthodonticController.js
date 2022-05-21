const Orthodontic = require("../models/orthodonticModel");
const asyncHandler = require("express-async-handler");

const getOrthodontics = asyncHandler(async (req, res) => {
	const orthodontic = await Orthodontic.find();
	res.json(orthodontic);
});

const getOrthodonticCount = asyncHandler(async (req, res) => {
	const orthodontic = await Orthodontic.find({ year: new Date().getFullYear() });
	var i = orthodontic.length;
	var loopData = {};
	var loopData = new Object();
	var loopData = {
		orthodontics: i,
	};
	res.json(loopData);
});

const createOrthodontic = asyncHandler(async (req, res) => {
	const { nic, firstVisit, fullCost, paid, facialExamination, followUpVisits, remark } = req.body;

	if (!nic || !firstVisit || !fullCost || !paid || !facialExamination) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const orthodontic = new Orthodontic({
			nic,
			firstVisit,
			fullCost,
			paid,
			facialExamination,
			followUpVisits,
			remark,
		});

		const createdOrthodontic = await orthodontic.save();

		res.status(201).json(createdOrthodontic);
	}
});

const getOrthodonticById = asyncHandler(async (req, res) => {
	const orthodontic = await Orthodontic.findById(req.params.id);

	if (orthodontic) {
		res.json(orthodontic);
	} else {
		res.status(404).json({ message: "Orthodontic not found" });
	}
});

const updateOrthodontic = asyncHandler(async (req, res) => {
	const { nic, firstVisit, fullCost, paid, facialExamination, followUpVisits, remark } = req.body;

	const orthodontic = await Orthodontic.findById(req.params.id);

	if (orthodontic) {
		orthodontic.nic = nic;
		orthodontic.firstVisit = firstVisit;
		orthodontic.fullCost = fullCost;
		orthodontic.paid = paid;
		orthodontic.facialExamination = facialExamination;
		orthodontic.followUpVisits = followUpVisits;
		orthodontic.remark = remark;

		const UpdatedOrthodontic = await orthodontic.save();
		res.json(UpdatedOrthodontic);
	} else {
		res.status(404);
		throw new Error("Orthodontic not found");
	}
});

const deleteOrthodontic = asyncHandler(async (req, res) => {
	const orthodontic = await Orthodontic.findById(req.params.id);

	if (orthodontic) {
		await orthodontic.remove();
		res.json({ message: "Orthodontic Removed" });
	} else {
		res.status(404);
		throw new Error("Orthodontic not Found");
	}
});

module.exports = {
	getOrthodontics,
	createOrthodontic,
	getOrthodonticById,
	updateOrthodontic,
	deleteOrthodontic,
	getOrthodonticCount,
};
