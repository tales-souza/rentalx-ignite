"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FeedbackRepository = void 0;

var _typeorm = require("typeorm");

var _Feedback = require("../entities/Feedback");

class FeedbackRepository {
  constructor() {
    this.repository = (0, _typeorm.getRepository)(_Feedback.Feedback);
  }

  async create({
    comment,
    type,
    screenshot
  }) {
    const feedback = await this.repository.create({
      comment,
      screenshot,
      type
    });
    await this.repository.save(feedback);
    return feedback;
  }

}

exports.FeedbackRepository = FeedbackRepository;