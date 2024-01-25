const asyncHandler = require("express-async-handler");

const Trades = require("../../schemas/Trades.schema");
const Users = require("../../schemas/Users.schema");
const { newTradeCreated } = require("../../libs/nodemailer");
const createDateFromString = require("../../utils/createDate");
const { calculateDaysRemaining, validateType } = require("../../utils/trades");

const getTrades = asyncHandler(async (req, res) => {
	let trades = await Trades.find({ author: req.user._id }).sort({ _id: -1 }).limit(50);
	trades = trades.map((trade) => {
		const { amount, status, type, createdAt, _id } = trade;
		return { amount, status, type, createdAt, _id, remainingDays: status === "active" ? calculateDaysRemaining(trade.type, trade.createdAt) : 0 };
	});
	res.status(200).json(trades);
});

const getAllTrades = asyncHandler(async (req, res) => {
	let trades = await Trades.find({}).sort({ _id: -1 }).limit(0).populate("author", "firstname lastname");
	trades = trades.map((trade) => {
		const { amount, status, type, createdAt, _id, author } = trade;
		return { amount, status, type, createdAt, _id, author, remainingDays: status === "active" ? calculateDaysRemaining(trade.type, trade.createdAt) : 0 };
	});
	res.status(200).json(trades);
});
const createNewTrade = asyncHandler(async (req, res) => {
	const { amount, type } = req.body;

	if (!amount || !type) {
		res.status(400);
		throw new Error("Please provide all required information");
	}

	if (!validateType(amount, type)) {
		res.status(400);
		throw new Error("Please make sure the amount and the type matches as shown");
	}
	// Check user's balance
	if (req.user.balance < amount) {
		res.status(400);
		throw new Error("Balance is insufficient to complete this request");
	}

	// Create new trade
	let trade = await Trades.create({ author: req.user._id, amount, status: "active", type });

	// Update user's balance
	await Users.updateOne({ _id: req.user._id }, { $inc: { balance: -amount } });

	// Send admin email
	await newTradeCreated({
		username: req.user.firstname,
		type,
		tradeId: trade._id,
		amount: `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
		date: createDateFromString(trade.createdAt),
	});

	res.status(200).json({ success: true, message: "Your trade has been successfully created" });
});

module.exports = { getTrades, createNewTrade, getAllTrades };
