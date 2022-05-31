const BasicTreatment = require("../models/basicTreatmentModel");
const asyncHandler = require("express-async-handler");

const getBasicTreatments = asyncHandler(async (req, res) => {
	const basicTreatments = await BasicTreatment.find();
	res.json(basicTreatments);
});

const getBasicTreatmentCount = asyncHandler(async (req, res) => {
	const basicTreatments = await BasicTreatment.find({ year: new Date().getFullYear() });
	var i = 0;
	var a = 0,
		b = 0,
		c = 0,
		d = 0,
		e = 0;
	var loopData = {};
	var loopData = new Object();
	while (i < basicTreatments.length) {
		if (basicTreatments[i].treatmentType === "Dentures") {
			a = a + 1;
		} else if (basicTreatments[i].treatmentType === "Paedodontics") {
			b = b + 1;
		} else if (basicTreatments[i].treatmentType === "Extraction") {
			c = c + 1;
		} else if (basicTreatments[i].treatmentType === "Oral heigene") {
			d = d + 1;
		} else if (basicTreatments[i].treatmentType === "Full Mouth Scaling") {
			e = e + 1;
		}
		i++;
	}
	var loopData = {
		dentures: a,
		paedodontics: b,
		extraction: c,
		oral_heigene: d,
		full_mouth_scaling: e,
	};
	res.json(loopData);
});

const createBasicTreatment = asyncHandler(async (req, res) => {
	const { nic, cost, treatmentType, date, checkup, procedure, remark } = req.body;

	if (!nic || !cost || !treatmentType || !date || !checkup || !procedure) {
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

const updateBasicTreatment = asyncHandler(async (req, res) => {
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

const deleteBasicTreatment = asyncHandler(async (req, res) => {
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
	createBasicTreatment,
	getBasicTreatmentById,
	updateBasicTreatment,
	deleteBasicTreatment,
	getBasicTreatmentCount,
};
