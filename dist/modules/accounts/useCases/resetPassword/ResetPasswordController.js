"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordController = void 0;

var _tsyringe = require("tsyringe");

var _ResetPasswordUseCase = require("./ResetPasswordUseCase");

class ResetPasswordController {
  async handle(request, response) {
    const resetPasswordUseCase = _tsyringe.container.resolve(_ResetPasswordUseCase.ResetPasswordUseCase);

    const {
      token
    } = request.query;
    const {
      password
    } = request.body;
    await resetPasswordUseCase.execute({
      password,
      token: String(token)
    });
    return response.status(200).send();
  }

}

exports.ResetPasswordController = ResetPasswordController;