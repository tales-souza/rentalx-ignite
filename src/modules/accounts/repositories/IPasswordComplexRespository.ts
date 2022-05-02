import { IPasswordComplexDTO } from "../dtos/ICreatePasswordComplexDTO";
import { PasswordComplex } from "../infra/typeorm/entities/PasswordComplex";

// eslint-disable-next-line @typescript-eslint/naming-convention
interface IPasswordComplexRepository {
  create(data: IPasswordComplexDTO): Promise<PasswordComplex>;
  getOne(): Promise<PasswordComplex>;
}

export { IPasswordComplexRepository };
