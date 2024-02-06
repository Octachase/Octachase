require("dotenv").config();
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const fs = require("fs");
const path = require("path");

const replaceKeys = require("../utils/replaceKeys");

const sendEmail = async (to, subject, body, attachments = undefined) => {
	const transport = nodemailer.createTransport(
		smtpTransport({
			// service: "Gmail",
			host: process.env.SMTP_HOST,
			port: 465,
			secure: true,
			auth: {
				user: process.env.EMAIL_ADDRESS,
				pass: process.env.EMAIL_PASSWORD, // you need to replace this pass.
			},
		})
	);

	const mailOptions = {
		from: { address: process.env.EMAIL_ADDRESS, name: "Octachase" },
		to,
		subject,
		html: body,
		attachments,
	};

	try {
		await transport.sendMail(mailOptions);
		return { msg: "Message succesfully sent" };
	} catch (error) {
		return { error: "Message sending failed" };
	}
};

async function sendVerifyEmail({ username, link, email }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "email-verification.html"), "utf-8");
	let keys = [
		{ tag: "{{username}}", value: username },
		{ tag: "{{link}}", value: link },
	];
	let subject = "Action Required - Verify Email";
	let message = replaceKeys(template, keys);
	await sendEmail(email, subject, message);
	console.log("Email successfully sent to user with email " + email);
}
async function sendResetPasswordEmail({ username, link, email }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "reset-passw-verification.html"), "utf-8");
	let keys = [
		{ tag: "{{username}}", value: username },
		{ tag: "{{link}}", value: link },
	];
	let subject = "Action Required - Reset Account Password";
	let message = replaceKeys(template, keys);
	await sendEmail(email, subject, message);
	console.log("Email successfully sent to user with email " + email);
}

async function sendContactMessage({ name, email, message, type }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "contact-message.html"), "utf-8");
	let keys = [
		{ tag: "{{name}}", value: name },
		{ tag: "{{message}}", value: message },
		{ tag: "{{email}}", value: email },
		{ tag: "{{type}}", value: type },
	];

	let subject = "ATTENTION - New Contact Message";
	let txt = replaceKeys(template, keys);
	await sendEmail(process.env.SUPPORT_EMAIL, subject, txt);
}

async function notifyUserOfContact({ name, email, message }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "contact-received.html"), "utf-8");
	let keys = [
		{ tag: "{{name}}", value: name },
		{ tag: "{{email}}", value: email },
		{ tag: "{{message}}", value: message },
	];

	let subject = "Thank You for Contacting Us!";
	let txt = replaceKeys(template, keys);
	await sendEmail(email, subject, txt);
}

async function notifyAdminOfPendingDeposit({ name, file, amount, txnId, date, link }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "new-deposit.html"), "utf-8");
	let keys = [
		{ tag: "{{name}}", value: name },
		{ tag: "{{amount}}", value: amount },
		{ tag: "{{date}}", value: date },
		{ tag: "{{txnId}}", value: txnId },
		{ tag: "{{link}}", value: link },
	];

	let attachment = [
		{
			filename: file.originalname,
			content: file.buffer,
		},
	];
	let subject = `Action Required - New Deposit Received!! (${txnId})`;

	let txt = replaceKeys(template, keys);

	await sendEmail(process.env.SUPPORT_EMAIL, subject, txt, attachment);
}
async function notifyAdminOfNewWithdrawalRequest({ name, amount, date, link, address, details, accountNumber }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "new-withdrawal.html"), "utf-8");
	let keys = [
		{ tag: "{{name}}", value: name },
		{ tag: "{{amount}}", value: amount },
		{ tag: "{{date}}", value: date },
		{ tag: "{{link}}", value: link },
		{ tag: "{{address}}", value: address ? address : accountNumber },
		{ tag: "{{details}}", value: details },
	];

	let subject = `Action Required - New Withdrawal Request Received!!`;
	let txt = replaceKeys(template, keys);

	await sendEmail(process.env.SUPPORT_EMAIL, subject, txt);
}

async function notifyUserOfModeratedTxn({ username, amount, txnId, status, type, date, email }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "transaction-moderated.html"), "utf-8");
	let keys = [
		{ tag: "{{username}}", value: username },
		{ tag: "{{amount}}", value: amount },
		{ tag: "{{date}}", value: date },
		{ tag: "{{txnId}}", value: txnId },
		{ tag: "{{status}}", value: status },
		{ tag: "{{type}}", value: type },
	];

	let subject = `ATTENTION - Your Transaction Has Been Moderated!!`;

	let txt = replaceKeys(template, keys);

	await sendEmail(email, subject, txt);
}
async function notifyUserOfProfit({ username, amount, email }) {
	let template = fs.readFileSync(path.join(__dirname, "..", "templates", "profit-received.html"), "utf-8");
	let keys = [
		{ tag: "{{username}}", value: username },
		{ tag: "{{amount}}", value: amount },
		{ tag: "{{support}}", value: process.env.SUPPORT_EMAIL },
	];

	let subject = `ATTENTION - Your Recived Profit...`;

	let txt = replaceKeys(template, keys);

	await sendEmail(email, subject, txt);
}

module.exports = {
	sendResetPasswordEmail,
	notifyUserOfContact,
	sendContactMessage,
	sendVerifyEmail,
	sendResetPasswordEmail,
	notifyAdminOfPendingDeposit,
	notifyUserOfModeratedTxn,
	notifyAdminOfNewWithdrawalRequest,
	notifyUserOfProfit,
};
