import { IFeedbackDTO } from "../../dtos/IFeedbackDTO";
import { Feedback } from "../../infra/typeorm/entities/Feedback";
import { IFeedbackRepository } from "../IFeedbackRepository";

class FeedbackRepositoryInMemory implements IFeedbackRepository {
  feedbacks: Feedback[] = [];

  async create({ type, comment, screenshot }: IFeedbackDTO): Promise<Feedback> {
    const feedback = new Feedback();

    Object.assign(feedback, {
      type,
      comment,
      screenshot,
    });

    this.feedbacks.push(feedback);

    return feedback;
  }
}

export { FeedbackRepositoryInMemory };
