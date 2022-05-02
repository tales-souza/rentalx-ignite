import { inject, injectable } from "tsyringe";

import { PasswordComplex } from "../../infra/typeorm/entities/PasswordComplex";
import { IPasswordComplexRepository } from "../../repositories/IPasswordComplexRespository";

@injectable()
class GetPasswordComplexUseCase {
  constructor(
    @inject("PasswordComplexRepository")
    private ipasswordComplexRepository: IPasswordComplexRepository
  ) {}

  async execute(): Promise<PasswordComplex> {
    const complexPassword = await this.ipasswordComplexRepository.getOne();
    return complexPassword;
  }
}

export { GetPasswordComplexUseCase };
