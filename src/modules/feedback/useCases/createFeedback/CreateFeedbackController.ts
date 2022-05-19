import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateFeedbackUseCase } from "./CreateFeedbackUseCase";

class CreateFeedbackController {
  async handle(request: Request, response: Response) {
    const { type, comment, screenshot } = request.body;

    const createFeedbackUseCase = container.resolve(CreateFeedbackUseCase);

    const feedback = await createFeedbackUseCase.execute({
      type,
      comment,
      screenshot,
    });

    return response.status(201).json(feedback);
  }
}

export { CreateFeedbackController };
