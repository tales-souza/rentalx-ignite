import { Repository, getRepository } from "typeorm";

import { IFeedbackDTO } from "../../../dtos/IFeedbackDTO";
import { IFeedbackRepository } from "../../../repositories/IFeedbackRepository";
import { Feedback } from "../entities/Feedback";

class FeedbackRepository implements IFeedbackRepository {
  private repository: Repository<Feedback>;

  constructor() {
    this.repository = getRepository(Feedback);
  }
  async create({ comment, type, screenshot }: IFeedbackDTO): Promise<Feedback> {
    const feedback = await this.repository.create({
      comment,
      screenshot,
      type,
    });

    await this.repository.save(feedback);

    return feedback;
  }
}

export { FeedbackRepository };
