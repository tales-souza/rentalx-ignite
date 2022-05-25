"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;

var _express = require("express");

var _cars = require("./cars.routes");

var _categories = require("./categories.routes");

var _feedback = require("./feedback.routes");

var _password = require("./password.routes");

var _rentals = require("./rentals.routes");

var _session = require("./session.routes");

var _specifications = require("./specifications.routes");

var _usersRoutes = require("./usersRoutes.routes");

const router = (0, _express.Router)();
exports.router = router;
router.use("/categories", _categories.categoriesRoutes);
router.use("/specifications", _specifications.specificationsRoutes);
router.use("/users", _usersRoutes.usersRoutes);
router.use("/", _session.sessionRoutes);
router.use("/cars", _cars.carsRoutes);
router.use("/rentals", _rentals.rentalRoutes);
router.use("/password", _password.passwordRoutes);
router.use("/feedback", _feedback.feedbackRoutes);