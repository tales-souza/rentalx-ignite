import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "../../../../config/auth";
import { UsersRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "../../../errors/AppError";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const userTokensRepository = new UsersTokensRepository();

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_refresh_token);

    const user = await userTokensRepository.findByUserIdAndUserToken(
      String(user_id),
      token
    );

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
