import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { passwordComplexFnc } from "../../../../utils/passwordComplexFnc";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordComplex = await passwordComplexFnc(password);

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
