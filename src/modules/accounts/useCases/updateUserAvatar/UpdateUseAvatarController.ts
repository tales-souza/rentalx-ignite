import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUseAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    // Receber Arquivo
    const avatar_file = request.file.filename;

    const updateUseAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUseAvatarUseCase.execute({ user_id: id, avatar_file });

    return response.status(204).send();
  }
}

export { UpdateUseAvatarController };
