const express = require("express");

const user = require("../../middlewares/user.middleware");
const admin = require("../../middlewares/admin.middleware");
const { getTrades, createNewTrade, getAllTrades } = require("./trades.controller");
const moderateTrade = require("../../cron-jobs/trade");

const tradesRouter = express.Router();
tradesRouter.get("/", user, getTrades);
tradesRouter.get("/all", user, admin, getAllTrades);
tradesRouter.post("/", user, createNewTrade);
tradesRouter.get("/moderate", moderateTrade);

module.exports = tradesRouter;
