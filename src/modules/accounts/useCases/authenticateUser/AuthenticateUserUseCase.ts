import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };

  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or Password incorrect", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or Password incorrect", 401);
    }

    const token = sign({}, "7a378b006e159d89f0113aa5dd2906fa", {
      subject: user.id,
      expiresIn: "1d",
    });

    const userReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };

    return userReturn;
  }
}

export { AuthenticateUserUseCase };
