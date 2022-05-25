"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserController = void 0;

var _tsyringe = require("tsyringe");

var _ProfileUserUseCase = require("./ProfileUserUseCase");

class ProfileUserController {
  async handle(request, response) {
    const profileUserUseCase = _tsyringe.container.resolve(_ProfileUserUseCase.ProfileUserUseCase);

    const user_id = request.user.id;
    const user = await profileUserUseCase.execute(user_id);
    return response.status(200).json(user);
  }

}

exports.ProfileUserController = ProfileUserController;