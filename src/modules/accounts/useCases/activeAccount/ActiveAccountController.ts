import { Request, Response } from "express";
import { container } from "tsyringe";

import { ActiveAccountUseCase } from "./ActiveAccountUseCase";

class ActiveAccountController {
  async handle(request: Request, response: Response) {
    const acctiveAccountUseCase = container.resolve(ActiveAccountUseCase);

    const { token } = request.query;

    await acctiveAccountUseCase.execute({ token: String(token) });

    return response.status(200).json({
      message: "Account activated successfully",
    });
  }
}

export { ActiveAccountController };
