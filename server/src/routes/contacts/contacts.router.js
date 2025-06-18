const express = require("express");
const { postContactMessage } = require("./contacts.controller");

const contactsRouter = express.Router();
contactsRouter.post("/", postContactMessage);

module.exports = contactsRouter;
