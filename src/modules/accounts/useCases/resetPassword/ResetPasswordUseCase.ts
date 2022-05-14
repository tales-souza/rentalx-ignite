import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { passwordComplexFnc } from "../../../../utils/passwordComplexFnc";
import { IPasswordComplexRepository } from "../../repositories/IPasswordComplexRespository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("PasswordComplexRepository")
    private passwordComplexRepository: IPasswordComplexRepository
  ) {}

  async execute({ password, token }: IRequest): Promise<void> {
    const passwordComplex = await passwordComplexFnc(
      this.passwordComplexRepository,
      password
    );

    if (passwordComplex) {
      throw new AppError(passwordComplex);
    }

    const userToken = await this.usersTokensRepository.findByRefreshToken(
      token
    );

    if (!userToken) {
      throw new AppError("Inválid Token!");
    }

    const tokenExpired = this.dateProvider.compareiIfBefore(
      userToken.expires_date,
      this.dateProvider.dateNow()
    );

    if (tokenExpired) {
      throw new AppError("Expired Token!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordUseCase };
