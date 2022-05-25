"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../config/upload"));

var _CreatePasswordComplexController = require("../../../../modules/accounts/useCases/createPasswordComplex/CreatePasswordComplexController");

var _CreateUserController = require("../../../../modules/accounts/useCases/createUser/CreateUserController");

var _GetPasswordComplexController = require("../../../../modules/accounts/useCases/getPasswordComplex/GetPasswordComplexController");

var _ProfileUserController = require("../../../../modules/accounts/useCases/profileUser/ProfileUserController");

var _UpdateUseAvatarController = require("../../../../modules/accounts/useCases/updateUserAvatar/UpdateUseAvatarController");

var _ensureAdmin = require("../middlewares/ensureAdmin");

var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const uploadAvatar = (0, _multer.default)(_upload.default);
const createUserController = new _CreateUserController.CreateUserController();
const updateUseAvatarController = new _UpdateUseAvatarController.UpdateUseAvatarController();
const profileUserController = new _ProfileUserController.ProfileUserController();
const createPasswordComplexController = new _CreatePasswordComplexController.CreatePasswordComplexController();
const getPasswordComplexController = new _GetPasswordComplexController.GetPasswordComplexController();
usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", _ensureAuthenticated.ensureAuthenticated, uploadAvatar.single("avatar"), updateUseAvatarController.handle);
usersRoutes.get("/profile", _ensureAuthenticated.ensureAuthenticated, profileUserController.handle);
usersRoutes.post("/passwordcomplex", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createPasswordComplexController.handle);
usersRoutes.get("/passwordcomplex", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, getPasswordComplexController.handle);