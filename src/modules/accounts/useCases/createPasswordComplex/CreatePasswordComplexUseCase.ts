import { inject, injectable } from "tsyringe";

import { IPasswordComplexDTO } from "../../dtos/ICreatePasswordComplexDTO";
import { PasswordComplex } from "../../infra/typeorm/entities/PasswordComplex";
import { IPasswordComplexRepository } from "../../repositories/IPasswordComplexRespository";

@injectable()
class CreatePasswordComplexUseCase {
  constructor(
    @inject("PasswordComplexRepository")
    private iPasswordComplexRepository: IPasswordComplexRepository
  ) {}

  async execute({
    qtt_characters,
    qtt_lowercase_characters,
    qtt_numeral_characters,
    qtt_special_characters,
    qtt_uppercase_characters,
  }: IPasswordComplexDTO): Promise<PasswordComplex> {
    const password_complex = await this.iPasswordComplexRepository.create({
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters,
    });

    return password_complex;
  }
}

export { CreatePasswordComplexUseCase };
