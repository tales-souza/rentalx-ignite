import { Request, Response } from "express";
import { container } from "tsyringe";

import { PasswordComplexUseCase } from "./PasswordComplexUseCase";

class PasswordComplexController {
  async handle(request: Request, response: Response) {
    const {
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters,
    } = request.body;

    const passwordComplexUseCase = container.resolve(PasswordComplexUseCase);

    const passwordComplex = await passwordComplexUseCase.execute({
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters,
    });

    return response.status(201).json(passwordComplex);
  }
}

export { PasswordComplexController };
