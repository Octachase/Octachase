const express = require("express");
const authRouter = require("./auth/auth.router");
const usersRouter = require("./users/users.router");
const transactionsRouter = require("./transactions/transactions.router");
const contactsRouter = require("./contacts/contacts.router");

const appRouter = express.Router();
appRouter.use("/auth", authRouter);
appRouter.use("/users", usersRouter);
appRouter.use("/transactions", transactionsRouter);
appRouter.use("/contacts", contactsRouter);

module.exports = appRouter;
