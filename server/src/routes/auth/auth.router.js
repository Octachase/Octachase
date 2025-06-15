const express = require("express");
const { controllerRegisterUser, controllerResetPassword, controllerSetPassword, controllerLoginUser, changeUserPassword, verifyAccount, controllerDeleteAccount } = require("./auth.controller");
const user = require("../../middlewares/user.middleware");

const authRouter = express.Router();

authRouter.post("/login", controllerLoginUser);
authRouter.post("/register", controllerRegisterUser);
authRouter.post("/reset-password", controllerResetPassword);
authRouter.put("/set-password", controllerSetPassword);
authRouter.put("/change-password", user, changeUserPassword);
authRouter.put("/verify-account", verifyAccount);
authRouter.delete("/delete-account", controllerDeleteAccount);

module.exports = authRouter;
