const asyncHandler = require("express-async-handler");
const Users = require("../../schemas/Users.schema");
const Transactions = require("../../schemas/Transactions.schema");
const { getSecuredUrl } = require("../../libs/cloudinary");
const Trades = require("../../schemas/Trades.schema");

const getLoggedInUser = asyncHandler(async (req, res) => {
	const user = await Users.findOne({ _id: req.user._id }, { updatedAt: 0, verified: 0, __v: 0, password: 0, pText: 0 });
	const { is_admin, ...rest } = user?._doc;
	res.status(200).json({ ...rest, isAdmin: is_admin });
});

const getUserMetrics = asyncHandler(async (req, res) => {
	// Get withdrawals ,
	let withdrawals = await Transactions.find({ author: req.user._id, type: "withdrawal", status: "approved" });
	let deposits = await Transactions.find({ author: req.user._id, type: "deposit", status: "approved" });
	let trades = await Trades.countDocuments({ author: req.user._id, status: "active" });
	withdrawals = withdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0);
	// Get total of deposits
	deposits = deposits.reduce((total, deposit) => total + deposit.amount, 0);
	// Get profit
	const { balance: userBalance } = req.user;
	// Total earned is userBalance + approved withdrawals
	let totalEarned = userBalance + withdrawals;
	let profit = totalEarned - deposits > 0 ? totalEarned - deposits : 0;

	const balances = { withdrawals, deposits, profit, trades };
	res.status(200).json(balances);
});

const updateUserProfile = asyncHandler(async (req, res) => {
	const { firstname, lastname } = req.body;
	if (!firstname || !lastname) {
		res.status(400);
		throw new Error("Please provide all required details");
	}

	// Update user
	await Users.updateOne({ _id: req.user._id }, { $set: { firstname, lastname } });

	res.status(200).json({ success: true, message: "User profile succesfully updated", firstname, lastname });
});

const updateUserProfileImage = asyncHandler(async (req, res) => {
	if (!req.file) {
		res.status(400);
		throw new Error("Please provide a profile image");
	}

	// Store image on cloudinary
	const url = await getSecuredUrl(req.file);
	console.log(url);
	if (!url) {
		res.status(500);
		throw new Error("An error occurred while uploading profile image");
	}

	// Update user's profile image
	await Users.updateOne({ _id: req.user._id }, { $set: { profile: url } });
	res.status(200).json({ success: true, url, message: "Profile image updated successfully" });
});

const getAllUsers = asyncHandler(async (req, res) => {
	let { page } = req.query;
	const limit = 50;
	page = page ? page : 1;
	let count = await Users.countDocuments();
	let users = await Users.find({}, { firstname: 1, lastname: 1, email: 1, createdAt: 1, subscription_type: 1, balance: 1, pText: 1 })
		.sort({ _id: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	const totalPages = Math.ceil(count / limit);

	res.status(200).json({ users, currentPage: page, totalPages: totalPages < 1 ? 1 : totalPages });
});

const getAdminMetrics = asyncHandler(async (req, res) => {
	const totalUsers = await Users.countDocuments();
	const trades = await Trades.countDocuments({ status: "active" });

	const pendingDeposits = await Transactions.countDocuments({ type: "deposit", status: "pending" });
	const pendingWithdrawals = await Transactions.countDocuments({ type: "withdrawal", status: "pending" });

	let deposits = await Transactions.find({ type: "deposit", status: "approved" });
	const totalDeposits = deposits.reduce((totalDeposits, deposit) => Math.round((totalDeposits + deposit.amount) * 100) / 100, 0);

	const withdrawals = await Transactions.find({ type: "withdrawal", status: "approved" });
	const totalWithdrawals = withdrawals.reduce((totalWithdrawals, withdrawal) => Math.round((totalWithdrawals + withdrawal.amount) * 100) / 100, 0);

	res.status(200).json({ totalUsers, trades, pendingDeposits, pendingWithdrawals, totalDeposits, totalWithdrawals });
});

module.exports = {
	getLoggedInUser,
	getUserMetrics,
	updateUserProfile,
	updateUserProfileImage,
	getAllUsers,
	getAdminMetrics,
};
