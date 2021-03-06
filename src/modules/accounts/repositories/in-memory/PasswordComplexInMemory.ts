import { IPasswordComplexDTO } from "@modules/accounts/dtos/ICreatePasswordComplexDTO";
import { PasswordComplex } from "@modules/accounts/infra/typeorm/entities/PasswordComplex";
import { IPasswordComplexRepository } from "@modules/accounts/repositories/IPasswordComplexRespository";

class PasswordComplexInMemory implements IPasswordComplexRepository {
  passwordComplexities: PasswordComplex[] = [];

  async create({
    qtt_characters,
    qtt_lowercase_characters,
    qtt_numeral_characters,
    qtt_special_characters,
    qtt_uppercase_characters,
  }: IPasswordComplexDTO): Promise<PasswordComplex> {
    const passwordComplex = new PasswordComplex();
    Object.assign(passwordComplex, {
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters,
    });

    this.passwordComplexities.push(passwordComplex);

    return passwordComplex;
  }

  async getOne(): Promise<PasswordComplex> {
    const passwordComplex = this.passwordComplexities[0];
    return passwordComplex;
  }
}

export { PasswordComplexInMemory };
