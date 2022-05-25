"use strict";

var _MailProviderInMemory = require("../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _FeedbackRepositoryInMemory = require("../../repositories/in-memory/FeedbackRepositoryInMemory");

var _CreateFeedbackUseCase = require("./CreateFeedbackUseCase");

let feedbackRepositoryInMemory;
let createFeedbackUseCase;
let mailProvider;
describe("Create feedback", () => {
  beforeEach(() => {
    feedbackRepositoryInMemory = new _FeedbackRepositoryInMemory.FeedbackRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    createFeedbackUseCase = new _CreateFeedbackUseCase.CreateFeedbackUseCase(feedbackRepositoryInMemory, mailProvider);
  });
  it("should be able to add a new feedback", async () => {
    const feedback = await createFeedbackUseCase.execute({
      type: "FEEDBACK",
      comment: "Teste de feedback"
    });
    expect(feedback).toHaveProperty("id");
  });
});