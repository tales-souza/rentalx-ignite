"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRoutes = void 0;

var _express = require("express");

var _ResetPasswordController = require("../../../../modules/accounts/useCases/resetPassword/ResetPasswordController");

var _SendForgotPasswordMailController = require("../../../../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController");

const passwordRoutes = (0, _express.Router)();
exports.passwordRoutes = passwordRoutes;
const sendForgotPasswordController = new _SendForgotPasswordMailController.SendForgotPasswordMailController();
const resetPasswordController = new _ResetPasswordController.ResetPasswordController();
passwordRoutes.post("/forgot", sendForgotPasswordController.handle);
passwordRoutes.post("/reset", resetPasswordController.handle);