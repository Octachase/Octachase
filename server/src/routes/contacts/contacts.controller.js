const asyncHandler = require("express-async-handler");
const { notifyUserOfContact, sendContactMessage } = require("../../libs/nodemailer");

const postContactMessage = asyncHandler(async (req, res) => {
	const { type, message, email, name } = req.body;
	if (!type || !message || !email || !name) {
		res.status(400);
		throw new Error("Please provide all required credentials");
	}
	// Send contact message
	await sendContactMessage({ email, type, message, name });

	// Notify user that their contact message was sent
	await notifyUserOfContact({ name, email, message });

	res.status(200).json({ success: true, message: "Your contact message was sent successfully" });
});

module.exports = { postContactMessage };
