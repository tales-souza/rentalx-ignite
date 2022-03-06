import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "7a378b006e159d89f0113aa5dd2906fa");

    const userRepository = new UsersRepository();

    const user = await userRepository.findById(String(user_id));

    if (!user) {
      throw new AppError("User does not exists!");
    }

    request.user = {
      id: String(user_id),
    };

    next();
  } catch (error) {
    throw new AppError("Invalid Token", 401);
  }
}
