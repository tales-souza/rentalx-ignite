"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUseAvatarController = void 0;

var _tsyringe = require("tsyringe");

var _UpdateUserAvatarUseCase = require("./UpdateUserAvatarUseCase");

class UpdateUseAvatarController {
  async handle(request, response) {
    const {
      id
    } = request.user; // Receber Arquivo

    const avatar_file = request.file.filename;

    const updateUseAvatarUseCase = _tsyringe.container.resolve(_UpdateUserAvatarUseCase.UpdateUserAvatarUseCase);

    await updateUseAvatarUseCase.execute({
      user_id: id,
      avatar_file
    });
    return response.status(204).send();
  }

}

exports.UpdateUseAvatarController = UpdateUseAvatarController;