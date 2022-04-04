import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    const { token } = request.query;
    const { password } = request.body;

    await resetPasswordUseCase.execute({ password, token: String(token) });

    return response.status(200).send();
  }
}

export { ResetPasswordController };
