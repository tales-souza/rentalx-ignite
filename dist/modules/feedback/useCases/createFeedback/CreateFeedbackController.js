"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFeedbackController = void 0;

var _tsyringe = require("tsyringe");

var _CreateFeedbackUseCase = require("./CreateFeedbackUseCase");

class CreateFeedbackController {
  async handle(request, response) {
    const {
      type,
      comment,
      screenshot
    } = request.body;

    const createFeedbackUseCase = _tsyringe.container.resolve(_CreateFeedbackUseCase.CreateFeedbackUseCase);

    const feedback = await createFeedbackUseCase.execute({
      type,
      comment,
      screenshot
    });
    return response.status(201).json(feedback);
  }

}

exports.CreateFeedbackController = CreateFeedbackController;