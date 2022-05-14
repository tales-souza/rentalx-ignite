import { inject, injectable } from "tsyringe";

import { Feedback } from "../infra/typeorm/entities/Feedback";
import { IFeedbackRepository } from "../repositories/IFeedbackRepository";

interface IRequest {
  id?: string;
  type: string;
  comment: string;
  screenshot?: string;
}

@injectable()
class CreateFeedbackUseCase {
  constructor(
    @inject("FeedbackRepository")
    private iFeedbackRepository: IFeedbackRepository
  ) {}

  async execute({ type, comment, screenshot }: IRequest): Promise<Feedback> {
    const feedback = await this.iFeedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    return feedback;
  }
}

export { CreateFeedbackUseCase };
