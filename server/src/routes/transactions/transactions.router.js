const express = require("express");
const upload = require("../../libs/multer");

const user = require("../../middlewares/user.middleware");
const admin = require("../../middlewares/admin.middleware");
const {
	postADepositProof,
	getATransaction,
	listAllPendingDeposits,
	changeTxnStatus,
	insertNewWithdrawal,
	listUserTransactions,
	listAllTransactions,
	listPendingTxns,
} = require("./transactions.controller");

const transactionsRouter = express.Router();

transactionsRouter.get("/", user, listUserTransactions);
transactionsRouter.post("/add-deposit", user, upload.single("image"), postADepositProof);
transactionsRouter.get("/get-pending-deposits", user, admin, listAllPendingDeposits);
transactionsRouter.get("/get-pending-txns", user, admin, listPendingTxns);
transactionsRouter.put("/:transactionId/status", user, admin, changeTxnStatus);
transactionsRouter.post("/add-withdrawal", user, insertNewWithdrawal);
transactionsRouter.get("/all", user, admin, listAllTransactions);
transactionsRouter.get("/:txnId", user, getATransaction);

module.exports = transactionsRouter;
