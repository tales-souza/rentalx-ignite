import { hash } from "bcryptjs";
import { resolve } from "path";
import { inject, injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IPasswordComplexRepository } from "@modules/accounts/repositories/IPasswordComplexRespository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { AppError } from "@shared/errors/AppError";
import { passwordComplexFnc } from "@utils/passwordComplexFnc";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("PasswordComplexRepository")
    private passwordComplexRepository: IPasswordComplexRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("UsersTokensRepository")
    private UsersTokensRepository: IUsersTokensRepository,

    @inject("DayJsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordComplex = await passwordComplexFnc(
      this.passwordComplexRepository,
      password
    );

    if (passwordComplex) {
      throw new AppError(passwordComplex);
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      driver_license,
      is_active: false,
    });

    /* envia email para ativar conta */

    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "views",
      "emails",
      "activeAccount.hbs"
    );

    const token = uuidv4();

    const expires_date = this.dateProvider.addHours(24);

    await this.UsersTokensRepository.create({
      expires_date,
      refresh_token: token,
      user_id: user.id,
    });

    const variables = {
      name: user.name,
      link: `${process.env.ACTIVE_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      "Ative a sua conta",
      variables,
      templatePath
    );
  }
}

export { CreateUserUseCase };
