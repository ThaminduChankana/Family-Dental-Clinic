const Inventory = require("../models/InventoryModels");
const asyncHandler = require("express-async-handler");

const getInventory = asyncHandler(async (req, res) => {
	const inventory = await Inventory.find();
	res.json(inventory);
});

const CreateInventory = asyncHandler(async (req, res) => {
	const { productName, quantity, description } = req.body;

	if (!productName || !quantity || !description) {
		res.status(400);
		throw new Error("Please input details to all the fields");
	} else {
		const inventory = new Inventory({
			productName,
			quantity,
			description,
		});

		const createdInventory = await inventory.save();
		res.status(201).json(createdInventory);
	}
});

const getInventoryById = asyncHandler(async (req, res) => {
	const inventory = await Inventory.findById(req.params.id);

	if (inventory) {
		res.json(inventory);
	} else {
		res.status(404).json({ message: "Inventory not found" });
	}
});

const UpdateInventory = asyncHandler(async (req, res) => {
	const { productName, quantity, description } = req.body;

	const inventory = await Inventory.findById(req.params.id);

	if (inventory) {
		inventory.productName = productName;
		inventory.quantity = quantity;
		inventory.description = description;

		const updatedinventory = await inventory.save();
		res.json(updatedinventory);
	} else {
		res.status(404);
		throw new Error("Inventory not found");
	}
});

const DeleteInventory = asyncHandler(async (req, res) => {
	const inventory = await Inventory.findById(req.params.id);

	if (inventory) {
		await inventory.remove();
		res.json({ message: "Removed the Inventory" });
	} else {
		res.status(404);
		throw new Error("Inventory not found");
	}
});

const getInventoryCount = asyncHandler(async (req, res) => {
	const inventory = await Inventory.find({ year: new Date().getFullYear() });

	var i = 0;
	var a = 0,
		b = 0,
		c = 0,
		d = 0,
		e = 0;
	(f = 0), (g = 0), (h = 0);
	var loopData = {};
	var loopData = new Object();
	while (i < inventory.length) {
		if (inventory[i].productName === "Absorbent Points") {
			a = a + inventory[i].quantity;
		} else if (inventory[i].productName === "Cotton Packs") {
			b = b + inventory[i].quantity;
		} else if (inventory[i].productName === "Irrigating Devices") {
			c = c + inventory[i].quantity;
		} else if (inventory[i].productName === "Bands") {
			d = d + inventory[i].quantity;
		} else if (inventory[i].productName === "Brackets") {
			e = e + inventory[i].quantity;
		} else if (inventory[i].productName === "Archwires") {
			f = f + inventory[i].quantity;
		} else if (inventory[i].productName === "Twizzers") {
			g = g + inventory[i].quantity;
		} else if (inventory[i].productName === "Mouth Mirror") {
			h = h + inventory[i].quantity;
		}
		i++;
	}
	var loopData = {
		absorbent_points: a,
		cotton_packs: b,
		irrigating_devices: c,
		bands: d,
		brackets: e,
		archwires: f,
		twizzers: g,
		mouth_mirror: h,
	};
	res.json(loopData);
});

module.exports = {
	getInventory,
	CreateInventory,
	getInventoryById,
	UpdateInventory,
	DeleteInventory,
	getInventoryCount,
};
