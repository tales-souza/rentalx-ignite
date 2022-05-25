"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionRoutes = void 0;

var _express = require("express");

var _AuthenticateUserController = require("../../../../modules/accounts/useCases/authenticateUser/AuthenticateUserController");

var _RefreshTokenController = require("../../../../modules/accounts/useCases/refreshToken/RefreshTokenController");

const sessionRoutes = (0, _express.Router)();
exports.sessionRoutes = sessionRoutes;
const authenticateController = new _AuthenticateUserController.AuthenticateController();
const refreshTokenController = new _RefreshTokenController.RefreshTokenController();
sessionRoutes.post("/session", authenticateController.handle);
sessionRoutes.post("/refresh-token", refreshTokenController.handle);