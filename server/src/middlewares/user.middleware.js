// const User = require("../models/user.schema");
const jwt = require("jsonwebtoken");
const Users = require("../schemas/Users.schema");
const asyncHandler = require("express-async-handler");

const user = asyncHandler(async (req, res, next) => {
	try {
		if (!req?.headers?.authorization || !req.headers.authorization.startsWith("Bearer ")) {
			res.status(401);
			throw new Error("Please log in to perform this request");
		}
		let token = req?.headers.authorization.split(" ")[1];
		// Compare auth
		let valid = await jwt.verify(token, process.env.SECRET);
		if (!valid.userId) {
			res.status(401);
			throw new Error("Please log in to perform this task");
		}
		const user = await Users.findOne({ _id: valid.userId }, { password: 0, code: 0 });
		if (!user) {
			res.status(401);
			throw new Error("Please log in to perform this task");
		}

		const { email, _id, is_admin: isAdmin, profit, profile, firstname } = user;
		req.user = { email, _id, isAdmin, profit, profile, firstname };
	} catch (err) {
		res.status(403).json({ error: err.message });
		return;
	}
	next();
});

module.exports = user;
