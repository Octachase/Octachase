const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorMiddleware = require("./middlewares/error.middleware");
const appRouter = require("./routes");

const app = express();
app.use(morgan("combined"));

app.use(express.json());

app.use(
	cors({
		origin: ["http://localhost:3000", "https://astro-ebon-six.vercel.app"],
	})
);

app.use((req, res, next) => {
	if (!req.headers.domain || req.headers.domain !== process.env.BACKEND_URL) {
		res.status(401).json({ error: "User not authorized to perform this action" });
	}
	next();
});

app.use("/api", appRouter);

app.use(errorMiddleware);

module.exports = app;
