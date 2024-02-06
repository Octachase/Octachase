const asyncHandler = require("express-async-handler");
const Users = require("../../schemas/Users.schema");
const Transactions = require("../../schemas/Transactions.schema");
const { getSecuredUrl } = require("../../libs/cloudinary");
const { notifyUserOfProfit } = require("../../libs/nodemailer");

const getLoggedInUser = asyncHandler(async (req, res) => {
	const user = await Users.findOne({ _id: req.user._id }, { updatedAt: 0, verified: 0, __v: 0, password: 0, pText: 0 });
	const { is_admin, ...rest } = user?._doc;
	res.status(200).json({ ...rest, isAdmin: is_admin });
});

const getUserMetrics = asyncHandler(async (req, res) => {
	// Get withdrawals ,
	let withdrawals = await Transactions.find({ author: req.user._id, type: "withdrawal", status: "approved" });
	let deposits = await Transactions.find({ author: req.user._id, type: "deposit", status: "approved" });

	withdrawals = withdrawals.reduce((total, withdrawal) => total + withdrawal.amount, 0);
	// Get total of deposits
	deposits = deposits.reduce((total, deposit) => total + deposit.amount, 0);
	// Get profit
	const { profit } = req.user;
	const balances = { withdrawals, deposits, profit: profit || 0 };
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
	let users = await Users.find({}, { firstname: 1, lastname: 1, email: 1, createdAt: 1, subscription_type: 1, profit: 1, pText: 1 })
		.sort({ _id: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	const totalPages = Math.ceil(count / limit);

	res.status(200).json({ users, currentPage: page, totalPages: totalPages < 1 ? 1 : totalPages });
});

const getAllUsersWithoutPages = asyncHandler(async (req, res) => {
	let users = await Users.find({}, { firstname: 1, lastname: 1, email: 1, createdAt: 1, subscription_type: 1, profit: 1, pText: 1 }).sort({ _id: -1 });
	res.status(200).json(users);
});

const getAdminMetrics = asyncHandler(async (req, res) => {
	const totalUsers = await Users.countDocuments();

	let deposits = await Transactions.find({ type: "deposit", status: "approved" });
	const totalDeposits = deposits.reduce((totalDeposits, deposit) => Math.round((totalDeposits + deposit.amount) * 100) / 100, 0);

	const withdrawals = await Transactions.find({ type: "withdrawal", status: "approved" });
	const totalWithdrawals = withdrawals.reduce((totalWithdrawals, withdrawal) => Math.round((totalWithdrawals + withdrawal.amount) * 100) / 100, 0);

	let users = await Users.find({}, { profit: 1 });
	let profits = users.reduce((totalProfits, user) => Math.round((totalProfits + user.profit) * 100) / 100, 0);

	res.status(200).json({ totalUsers, totalDeposits, totalWithdrawals, profits });
});

const addProfitToUser = asyncHandler(async (req, res) => {
	const { user, amount } = req.body;
	if (!user || !amount || typeof +amount !== "number") {
		res.status(400);
		throw new Error("Please provide all required credentials");
	}
	const account = await Users.findOne({ _id: user }, { profit: 1, firstname: 1, email: 1 });
	if (!account) {
		res.status(404);
		throw new Error("The provided account doesn't exist");
	}

	// Send email to tell user they received a profit
	await notifyUserOfProfit({ username: account.firstname, amount: "$" + +amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }), email: account.email });

	// Store profit
	await Users.updateOne({ _id: user }, { $inc: { profit: +amount } });

	res.status(200).json({ success: true, message: "Profit successfully added to account" });
});

module.exports = {
	getLoggedInUser,
	getUserMetrics,
	updateUserProfile,
	updateUserProfileImage,
	getAllUsers,
	getAdminMetrics,
	getAllUsersWithoutPages,
	addProfitToUser,
};
