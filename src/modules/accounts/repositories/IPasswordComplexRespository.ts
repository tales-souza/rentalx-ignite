import { IPasswordComplexDTO } from "@modules/accounts/dtos/ICreatePasswordComplexDTO";
import { PasswordComplex } from "@modules/accounts/infra/typeorm/entities/PasswordComplex";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IPasswordComplexRepository {
  create(data: IPasswordComplexDTO): Promise<PasswordComplex>;
  getOne(): Promise<PasswordComplex>;
}

export { IPasswordComplexRepository };
