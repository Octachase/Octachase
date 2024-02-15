const asyncHandler = require("express-async-handler");
const Transactions = require("../../schemas/Transactions.schema");
const Users = require("../../schemas/Users.schema");
const { notifyAdminOfPendingDeposit, notifyAdminOfNewWithdrawalRequest, notifyUserOfModeratedTxn, addFeesToWithdrawalMail } = require("../../libs/nodemailer");
const createDateFromString = require("../../utils/createDate");

const postADepositProof = asyncHandler(async (req, res) => {
	const { amount, txnId } = req.body;

	if (!amount || !txnId) {
		res.status(400);
		throw new Error("Please provide all required fields ");
	}
	// Check if txnId exists
	const txn = await Transactions.findOne({ txnId });
	if (txn) {
		res.status(400);
		throw new Error("The provided transaction has already been registered. Please wait as we confirm deposit");
	}
	// Insert new proof
	let proof = await Transactions.create({ transactionId: txnId, type: "deposit", amount, author: req.user._id });

	// Send an email to admin to notify them of transaction
	const link = `${process.env.FRONTEND_URL}/admin/transactions/${proof._id}`;
	await notifyAdminOfPendingDeposit({
		name: req.user.firstname,
		amount: `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
		txnId,
		date: createDateFromString(new Date()),
		file: req.file,
		link,
	});

	res.status(200).json({ success: true, message: "The deposit proof has been successfully added" });
});

const listAllPendingDeposits = asyncHandler(async (req, res) => {
	let { page } = req.query;
	page = page ? +page : 1;
	const limit = 50;
	const total = await Transactions.countDocuments({ type: "deposit", status: "pending" });
	const deposits = await Transactions.find({ type: "deposit", status: "pending" }, { __v: 0, createdAt: 0, updatedAt: 0 })
		.sort({ _id: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	res.status(200).json({ txns: deposits, currentPage: page, totalPages: Math.ceil(total / limit) || 1 });
});

const getATransaction = asyncHandler(async (req, res) => {
	const txn = await Transactions.findOne({ _id: req.params.txnId }, { updatedAt: 0, __v: 0 }).populate("author", "firstname lastname email");
	if (!txn) {
		res.status(404);
		throw new Error("The transaction does not exist");
	}
	res.status(200).json(txn);
});

const changeTxnStatus = asyncHandler(async (req, res) => {
	const { transactionId } = req.params;
	let { status } = req.body;
	if (!status || !["approved", "declined"].includes(status)) {
		res.status(400);
		throw new Error("Please provide a valid status");
	}

	const txn = await Transactions.findOne({ _id: transactionId }).populate("author", "firstname email");
	if (!txn) {
		res.status(404);
		throw new Error("The provided transaction does not exist");
	}

	// Check if txn is not pending
	if (txn.status !== "pending") {
		res.status(400);
		throw new Error("The provided transaction has already been moderated . Create a new transaction to continue");
	}

	// Add the amount back into user's profit if withdrawal is declined
	if (status === "declined" && txn?.type === "withdrawal") {
		await Users.updateOne({ _id: txn.author }, { $inc: { profit: txn.amount } });
	}

	// Send an email to user
	await notifyUserOfModeratedTxn({
		username: txn.author.firstname,
		amount: `$${txn.amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
		txnId: txn._id,
		status: status,
		type: txn.type,
		date: createDateFromString(new Date()),
		email: txn.author.email,
	});

	// Change the status of the transaction
	await Transactions.updateOne({ _id: transactionId }, { $set: { status: status } });
	res.status(200).json({ success: true, message: "The transaction has been successfully moderated..." });
});

const addFeesToAWithdrawal = asyncHandler(async (req, res) => {
	const { transactionId } = req.params;

	if (!req?.body?.fees) {
		res.status(400);
		throw new Error("Please provide a fee");
	}
	const txn = await Transactions.findOne({ _id: transactionId }).populate("author", "email firstname");
	if (!txn) {
		res.status(404);
		throw new Error("The provided transaction does not exist");
	}

	// Check txn type
	if (txn?.type !== "withdrawal") {
		res.status(400);
		throw new Error("The provided transaction type does not require fees");
	}

	// Add fees
	const { amount, author, details } = txn;
	// Send email to transaction owner
	await addFeesToWithdrawalMail({
		type: details?.method == "Bank Transfer" ? "Bank" : details?.method,
		amount: `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
		email: author?.email,
		// Address Description
		address: details?.accountName ? `a full name of ${details?.accountName}` : details?.address ? `an address of ${details?.address}` : `a tag of ${details?.tag}`,
		fees: `$${req.body.fees.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
	});

	await Transactions.updateOne({ _id: transactionId }, { $set: { fee: req.body.fees } });

	res.status(200).json({ success: true, message: "Fees added successfully to withdrawal request" });
});

const insertNewWithdrawal = asyncHandler(async (req, res) => {
	let { address, amount, details, accountNumber, tag } = req.body;
	if ((!address && !accountNumber && !tag) || !amount || !details?.method) {
		res.status(400);
		throw new Error(`Please provide a valid address ,account number or cashapp tag, a method and an amount to withdraw`);
	}

	// Check if the provided amount is okay
	if (req.user.profit < amount) {
		res.status(400);
		throw new Error("User balance is insufficient to complete withdrawal request");
	}

	// Create new transaction
	let proof = await Transactions.create({ amount, author: req.user._id, type: "withdrawal", status: "pending", details: { ...details, accountNumber, address, tag } });

	// Create details
	const keys = Array.from(Object.keys(details));
	const detailsText = keys.reduce((acc, key) => (!details[key] ? acc : acc ? `${acc} <br/> ${key.toUpperCase()}: ${details[key]}` : `${key.toUpperCase()}: ${details[key]}`), "");
	// Add an email to admin
	const link = `${process.env.FRONTEND_URL}/admin/transactions/${proof._id}`;
	await notifyAdminOfNewWithdrawalRequest({
		amount: `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
		address: address ? address : tag,
		accountNumber,
		name: req.user._id,
		details: detailsText,
		date: createDateFromString(new Date()),
		link,
	});

	// Deduct withdrawal amount from user's profit.
	await Users.updateOne({ _id: proof.author }, { $inc: { profit: -proof.amount } });

	res.status(200).json({ success: true, message: "The withdrawal request was successfully added" });
});
const listPendingTxns = asyncHandler(async (req, res) => {
	let { type } = req.query;
	if (!type || !["deposit", "withdrawal"].includes(type.toLowerCase())) {
		res.status(400);
		throw new Error("Please provide a valid transaction type");
	}

	const limit = 100;
	const txns = await Transactions.find({ type, status: "pending" }, { __v: 0, updatedAt: 0 }).sort({ _id: -1 }).limit(limit);
	res.status(200).json(txns);
});

const listUserTransactions = asyncHandler(async (req, res) => {
	let { type, page } = req.query;
	const limit = 50;
	type = type ? (["withdrawal", "deposit", "profit"].includes(type.toLowerCase()) ? type : "") : "";
	page = page ? page : 1;
	const filt = type ? { author: req.user._id, type } : { author: req.user._id };
	const count = await Transactions.countDocuments(filt);
	const txns = await Transactions.find(filt)
		.sort({ _id: -1 })
		.skip((page - 1) * limit)
		.limit(limit);
	res.status(200).json({ totalPages: Math.ceil(count / limit) < 1 ? 1 : Math.ceil(count / limit), currentPage: page, txns });
});

const listAllTransactions = asyncHandler(async (req, res) => {
	let { type } = req.query;
	const limit = 100;
	type = type ? (["withdrawal", "deposit", "profit"].includes(type.toLowerCase()) ? type : "") : "";

	const filt = type ? { type } : {};
	const txns = await Transactions.find(filt).sort({ _id: -1 }).populate("author", "email").limit(limit);
	res.status(200).json(txns);
});

module.exports = {
	postADepositProof,
	listAllPendingDeposits,
	changeTxnStatus,
	insertNewWithdrawal,
	listUserTransactions,
	listAllTransactions,
	listPendingTxns,
	getATransaction,
	addFeesToAWithdrawal,
};
