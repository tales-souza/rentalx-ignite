"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateController = void 0;

var _tsyringe = require("tsyringe");

var _AuthenticateUserUseCase = require("./AuthenticateUserUseCase");

class AuthenticateController {
  async handle(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticateUserController = _tsyringe.container.resolve(_AuthenticateUserUseCase.AuthenticateUserUseCase);

    const user = await authenticateUserController.execute({
      email,
      password
    });
    return response.status(200).json(user);
  }

}

exports.AuthenticateController = AuthenticateController;