import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserController = container.resolve(
      AuthenticateUserUseCase
    );

    const user = await authenticateUserController.execute({
      email,
      password,
    });

    return response.status(200).json(user);
  }
}

export { AuthenticateController };
