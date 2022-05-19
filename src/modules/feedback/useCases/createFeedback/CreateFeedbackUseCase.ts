import { resolve } from "path";
import { inject, injectable } from "tsyringe";

import { IMailProvider } from "../../../../shared/container/providers/MailProvider/IMailProvider";
import { Feedback } from "../../infra/typeorm/entities/Feedback";
import { IFeedbackRepository } from "../../repositories/IFeedbackRepository";

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
    private feedbackRepository: IFeedbackRepository,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  async execute({ type, comment, screenshot }: IRequest): Promise<Feedback> {
    const feedback = await this.feedbackRepository.create({
      type,
      comment,
      screenshot,
    });

    const templatePath2 = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "receivingFeedback.hbs"
    );

    const variables = {
      name: "Administrador",
      body: comment,
      screenshot,
    };

    await this.mailProvider.sendMail(
      "tales.monteiro@hotmail.com",
      "Você recebeu um feedback de um usuário",
      variables,
      templatePath2
    );

    return feedback;
  }
}

export { CreateFeedbackUseCase };
