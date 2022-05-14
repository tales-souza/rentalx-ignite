import { FeedbackRepositoryInMemory } from "../repositories/in-memory/FeedbackRepositoryInMemory";
import { CreateFeedbackUseCase } from "./CreateFeedbackUseCase";

let feedbackRepositoryInMemory: FeedbackRepositoryInMemory;
let createFeedbackUseCase: CreateFeedbackUseCase;

describe("Create feedback", () => {
  beforeEach(() => {
    feedbackRepositoryInMemory = new FeedbackRepositoryInMemory();
    createFeedbackUseCase = new CreateFeedbackUseCase(
      feedbackRepositoryInMemory
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
