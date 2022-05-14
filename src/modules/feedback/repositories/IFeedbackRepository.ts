import { IFeedbackDTO } from "../dtos/IFeedbackDTO";
import { Feedback } from "../infra/typeorm/entities/Feedback";

interface IFeedbackRepository {
  create(data: IFeedbackDTO): Promise<Feedback>;
}

export { IFeedbackRepository };
