"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRepositoryInMemory = void 0;

var _Feedback = require("../../infra/typeorm/entities/Feedback");

class FeedbackRepositoryInMemory {
  constructor() {
    this.feedbacks = [];
  }

  async create({
    type,
    comment,
    screenshot
  }) {
    const feedback = new _Feedback.Feedback();
    Object.assign(feedback, {
      type,
      comment,
      screenshot
    });
    this.feedbacks.push(feedback);
    return feedback;
  }

}

exports.FeedbackRepositoryInMemory = FeedbackRepositoryInMemory;