"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.feedbackRoutes = void 0;

var _express = require("express");

var _CreateFeedbackController = require("../../../../modules/feedback/useCases/createFeedback/CreateFeedbackController");

const feedbackRoutes = (0, _express.Router)();
exports.feedbackRoutes = feedbackRoutes;
const createFeedbackController = new _CreateFeedbackController.CreateFeedbackController();
feedbackRoutes.post("/", createFeedbackController.handle);