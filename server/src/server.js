const http = require("http");
const app = require("./app");

const { connectDB } = require("./libs/mongoose");
const cronJobs = require("./cron-jobs");

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);

(async function () {
	await connectDB();
	cronJobs();
	server.listen(PORT, () => {
		console.log(`Listening on PORT ${PORT}...`);
	});
})();
