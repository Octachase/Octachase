var cron = require("node-cron");

const moderateTrades = require("./trade");

async function runCron() {
	cron.schedule("0,10,20,30,40,50 * * * *", moderateTrades);
}

module.exports = runCron;
