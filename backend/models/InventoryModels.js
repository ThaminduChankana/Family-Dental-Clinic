const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema({
	productName: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	description: {
		type: String,
	},

	year: {
		default: new Date().getFullYear(),

		type: String,
	},
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
