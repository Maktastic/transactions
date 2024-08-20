const mongoose = require("mongoose");

// Check if the model already exists to avoid OverwriteModelError
const RecordModel = mongoose.models.Record || mongoose.model("Record", new mongoose.Schema({
	date: {
		type: Date,
		required: true,
	},
	phoneModel: {
		type: String,
		required: true,
	},
	purchaseSite: {
		type: String,
		required: true,
	},
	purchaseAmount: {
		type: Number,
		required: true,
	},
	purchaseQuantity: {
		type: Number,
		required: false,
		default: 1,
	},
	salesParty: {
		type: String,
		required: false,
	},
	salesAmount: {
		type: Number,
		required: false,
	},
	salesQuantity: {
		type: Number,
		required: false,
		default: 1,
	},
	profit: {
		type: Number,
		required: false,
	},
}));

module.exports = RecordModel;