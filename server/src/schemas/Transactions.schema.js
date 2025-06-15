const mongoose = require("mongoose");

const transactionsSchema = mongoose.Schema(
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
		// Required in all deposits but not withdrawals
		transactionId: {
			type: String,
		},
		type: {
			type: String,
			// Can be withdrawal  deposit
		},
		// Required in all withdrawals but not deposits
		details: {},
		// pending , approved or declined
		status: {
			type: String,
			default: "pending",
		},
		// Fee is needed in only withdrawals and is been set by admin later after a withdrawal request has been received
		fee: {
			type: Number,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Transaction", transactionsSchema);
