import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { FeedbackRepositoryInMemory } from "../../repositories/in-memory/FeedbackRepositoryInMemory";
import { CreateFeedbackUseCase } from "./CreateFeedbackUseCase";

let feedbackRepositoryInMemory: FeedbackRepositoryInMemory;
let createFeedbackUseCase: CreateFeedbackUseCase;
let mailProvider: MailProviderInMemory;

describe("Create feedback", () => {
  beforeEach(() => {
    feedbackRepositoryInMemory = new FeedbackRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    createFeedbackUseCase = new CreateFeedbackUseCase(
      feedbackRepositoryInMemory,
      mailProvider
    );
  });

  it("should be able to add a new feedback", async () => {
    const feedback = await createFeedbackUseCase.execute({
      type: "FEEDBACK",
      comment: "Teste de feedback",
    });

    expect(feedback).toHaveProperty("id");
  });
});
