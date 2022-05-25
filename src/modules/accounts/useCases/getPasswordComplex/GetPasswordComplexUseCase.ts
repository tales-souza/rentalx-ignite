import { inject, injectable } from "tsyringe";

import { PasswordComplex } from "@modules/accounts/infra/typeorm/entities/PasswordComplex";
import { IPasswordComplexRepository } from "@modules/accounts/repositories/IPasswordComplexRespository";

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
