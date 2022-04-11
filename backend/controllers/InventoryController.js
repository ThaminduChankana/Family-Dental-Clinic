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

module.exports = {
	getInventory,
	CreateInventory,
	getInventoryById,
	UpdateInventory,
	DeleteInventory,
};
