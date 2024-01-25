const asyncHandler = require("express-async-handler");

const Trades = require("../schemas/Trades.schema");
const Users = require("../schemas/Users.schema");
const { calculateDaysRemaining } = require("../utils/trades");
const { notifyUserOfCompletedTrade } = require("../libs/nodemailer");
const createDateFromString = require("../utils/createDate");

const moderateTrade = asyncHandler(async (req, res) => {
	// Find the oldest trade
	const trade = await Trades.findOne({ status: "active" }).sort({ _id: 1 }).populate("author", "email firstname lastname balance");

	if (!trade) return;
	const remainingDays = calculateDaysRemaining(trade.type, trade.createdAt);
	if (remainingDays === 0) {
		// Calculate profit
		const percentages = { starter: 0.35, silver: 0.6, gold: 0.75, platinum: 1.2 };
		const profit = Math.round(trade.amount * percentages[trade.type] * 100) / 100;

		// Send email to user to tell them trade has been completed
		await notifyUserOfCompletedTrade({
			username: trade.author.firstname,
			type: trade.type,
			tradeId: trade._id,
			amount: `$${trade.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
			date: createDateFromString(new Date()),
			email: trade.author.email,
			profit: `$${profit.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
		});
		// Update trade
		await Trades.updateOne({ _id: trade._id }, { $set: { status: "completed" } });

		// Update user's balance
		await Users.updateOne({ _id: trade.author }, { $inc: { balance: profit + trade.amount } });
	}
	res.status(200).json({ success: true });
});

module.exports = moderateTrade;
