import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IPasswordComplexRepository } from "@modules/accounts/repositories/IPasswordComplexRespository";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { passwordComplexFnc } from "@utils/passwordComplexFnc";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("PasswordComplexRepository")
    private passwordComplexRepository: IPasswordComplexRepository
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

    await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      driver_license,
    });
  }
}

export { CreateUserUseCase };
