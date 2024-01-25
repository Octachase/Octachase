const mongoose = require("mongoose");

const tradesSchema = mongoose.Schema(
	{
		amount: {
			type: Number,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		type: {
			type: "String",
			required: true,
		},
		status: {
			type: String,
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Trade", tradesSchema);
