const BasicTreatment = require("../models/basicTreatmentModel");
const asyncHandler = require("express-async-handler");

const getBasicTreatments = asyncHandler(async (req, res) => {
	const basicTreatments = await BasicTreatment.find();
	res.json(basicTreatments);
});

const CreateBasicTreatment = asyncHandler(async (req, res) => {
	const { nic, cost, treatmentType, date, checkup, procedure, remark } = req.body;

	if (!nic || !cost || !treatmentType || !date || !checkup || !procedure || !remark) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const basicTreatment = new BasicTreatment({
			nic,
			cost,
			treatmentType,
			date,
			checkup,
			procedure,
			remark,
		});

		const createdBasicTreatment = await basicTreatment.save();

		res.status(201).json(createdBasicTreatment);
	}
});

const getBasicTreatmentById = asyncHandler(async (req, res) => {
	const basicTreatment = await BasicTreatment.findById(req.params.id);

	if (basicTreatment) {
		res.json(basicTreatment);
	} else {
		res.status(404).json({ message: "Basic Treatment not found" });
	}
});

const UpdateBasicTreatment = asyncHandler(async (req, res) => {
	const { nic, cost, treatmentType, date, checkup, procedure, remark } = req.body;

	const basicTreatment = await BasicTreatment.findById(req.params.id);

	if (basicTreatment) {
		basicTreatment.nic = nic;
		basicTreatment.cost = cost;
		basicTreatment.treatmentType = treatmentType;
		basicTreatment.date = date;
		basicTreatment.checkup = checkup;
		basicTreatment.procedure = procedure;
		basicTreatment.remark = remark;

		const updatedbasicTreatment = await basicTreatment.save();
		res.json(updatedbasicTreatment);
	} else {
		res.status(404);
		throw new Error("Basic Treatment not found");
	}
});

const DeleteBasicTreatment = asyncHandler(async (req, res) => {
	const basicTreatment = await BasicTreatment.findById(req.params.id);

	if (basicTreatment) {
		await basicTreatment.remove();
		res.json({ message: "Basic Treatment Removed" });
	} else {
		res.status(404);
		throw new Error("Basic Treatement not Found");
	}
});

module.exports = {
	getBasicTreatments,
	CreateBasicTreatment,
	getBasicTreatmentById,
	UpdateBasicTreatment,
	DeleteBasicTreatment,
};
