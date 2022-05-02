import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetPasswordComplexUseCase } from "./GetPasswordComplexUseCase";

class GetPasswordComplexController {
  async handle(request: Request, response: Response) {
    const getPasswordComplexUseCase = container.resolve(
      GetPasswordComplexUseCase
    );

    const passwordComplex = await getPasswordComplexUseCase.execute();

    return response.status(200).json(passwordComplex);
  }
}

export { GetPasswordComplexController };
