import { hash } from "bcryptjs";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { IPasswordComplexRepository } from "@modules/accounts/repositories/IPasswordComplexRespository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  token: string;
}

@injectable()
class ActiveAccountUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("PasswordComplexRepository")
    private passwordComplexRepository: IPasswordComplexRepository
  ) {}

  async execute({ token }: IRequest): Promise<void> {
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

    const user = await this.usersRepository.findById(userToken.user_id);

    if (tokenExpired) {
      /* Exclui o token antigo */
      /* Vai ter que enviar email novamente com novo token */
      await this.usersTokensRepository.deleteById(userToken.id);

      const templatePath = resolve(
        __dirname,
        "..",
        "..",
        "views",
        "emails",
        "activeAccount.hbs"
      );

      const newToken = uuidv4();

      const expires_date = this.dateProvider.addHours(24);

      await this.usersTokensRepository.create({
        expires_date,
        refresh_token: newToken,
        user_id: userToken.user_id,
      });

      const variables = {
        name: user.name,
        link: `${process.env.ACTIVE_MAIL_URL}${newToken}`,
      };

      await this.mailProvider.sendMail(
        user.email,
        "Ative a sua conta",
        variables,
        templatePath
      );

      throw new AppError(
        "Expired Link! In a few moments, an email will be sent with a new activation link for your account"
      );
    }

    user.is_active = true;

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userToken.id);
  }
}

export { ActiveAccountUseCase };
