const Filling = require("../models/fillingModel");
const asyncHandler = require("express-async-handler");

const getFillings = asyncHandler(async (req, res) => {
	const fillings = await Filling.find();
	res.json(fillings);
});
const getFillingCount = asyncHandler(async (req, res) => {
	const fillings = await Filling.find({ year: new Date().getFullYear() });
	var i = fillings.length;
	var loopData = {};
	var loopData = new Object();
	var loopData = {
		filling: i,
	};
	res.json(loopData);
});

const createFilling = asyncHandler(async (req, res) => {
	const { nic, cost, fillingMaterial, fillingType, anestheticStatus, date, checkup, procedure, remark } = req.body;

	if (!nic || !cost || !fillingMaterial || !fillingType || !anestheticStatus || !date || !checkup || !procedure) {
		res.status(400);
		throw new Error("Please Fill all the feilds");
	} else {
		const filling = new Filling({
			nic,
			cost,
			fillingMaterial,
			fillingType,
			anestheticStatus,
			date,
			checkup,
			procedure,
			remark,
		});

		const createdFilling = await filling.save();

		res.status(201).json(createdFilling);
	}
});

const getFillingtById = asyncHandler(async (req, res) => {
	const filling = await Filling.findById(req.params.id);

	if (filling) {
		res.json(filling);
	} else {
		res.status(404).json({ message: "Filling not found" });
	}
});

const updateFilling = asyncHandler(async (req, res) => {
	const { nic, cost, fillingMaterial, fillingType, anestheticStatus, date, checkup, procedure, remark } = req.body;

	const filling = await Filling.findById(req.params.id);

	if (filling) {
		filling.nic = nic;
		filling.cost = cost;
		filling.fillingMaterial = fillingMaterial;
		filling.fillingType = fillingType;
		filling.anestheticStatus = anestheticStatus;
		filling.date = date;
		filling.checkup = checkup;
		filling.procedure = procedure;
		filling.remark = remark;

		const updatedFilling = await filling.save();
		res.json(updatedFilling);
	} else {
		res.status(404);
		throw new Error("Filling not found");
	}
});

const deleteFilling = asyncHandler(async (req, res) => {
	const filling = await Filling.findById(req.params.id);

	if (filling) {
		await filling.remove();
		res.json({ message: "Filling Removed" });
	} else {
		res.status(404);
		throw new Error("Filling not Found");
	}
});

module.exports = {
	getFillings,
	createFilling,
	getFillingtById,
	updateFilling,
	deleteFilling,
	getFillingCount,
};
