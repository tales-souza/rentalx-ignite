"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateFeedbackUseCase = void 0;

var _path = require("path");

var _tsyringe = require("tsyringe");

var _dec, _class;

let CreateFeedbackUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateFeedbackUseCase {
  constructor(feedbackRepository, mailProvider) {
    this.feedbackRepository = feedbackRepository;
    this.mailProvider = mailProvider;
  }

  async execute({
    type,
    comment,
    screenshot
  }) {
    const feedback = await this.feedbackRepository.create({
      type,
      comment,
      screenshot
    });
    const templatePath2 = (0, _path.resolve)(__dirname, "..", "..", "views", "emails", "receivingFeedback.hbs");
    const variables = {
      name: "Administrador",
      body: comment,
      screenshot
    };
    await this.mailProvider.sendMail("tales.monteiro@hotmail.com", "Você recebeu feedback de um usuário", variables, templatePath2);
    return feedback;
  }

}) || _class);
exports.CreateFeedbackUseCase = CreateFeedbackUseCase;