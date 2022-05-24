import { getRepository, Repository } from "typeorm";

import { IPasswordComplexDTO } from "@modules/accounts/dtos//ICreatePasswordComplexDTO";
import { PasswordComplex } from "@modules/accounts/infra/typeorm/entities/PasswordComplex";
import { IPasswordComplexRepository } from "@modules/accounts/repositories/IPasswordComplexRespository";

class PasswordComplexRepository implements IPasswordComplexRepository {
  private repository: Repository<PasswordComplex>;

  constructor() {
    this.repository = getRepository(PasswordComplex);
  }

  async create({
    qtt_characters,
    qtt_lowercase_characters,
    qtt_numeral_characters,
    qtt_special_characters,
    qtt_uppercase_characters,
  }: IPasswordComplexDTO): Promise<PasswordComplex> {
    const passwordComplex = this.repository.create({
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters,
    });

    await this.repository.save(passwordComplex);

    return passwordComplex;
  }

  async getOne(): Promise<PasswordComplex> {
    const passwordComplex = await this.repository.findOne();
    return passwordComplex;
  }
}

export { PasswordComplexRepository };
