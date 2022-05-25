"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetPasswordUseCase = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/errors/AppError");

var _passwordComplexFnc = require("@utils/passwordComplexFnc");

var _dec, _class;

let ResetPasswordUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ResetPasswordUseCase {
  constructor(usersTokensRepository, dateProvider, usersRepository, passwordComplexRepository) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
    this.usersRepository = usersRepository;
    this.passwordComplexRepository = passwordComplexRepository;
  }

  async execute({
    password,
    token
  }) {
    const passwordComplex = await (0, _passwordComplexFnc.passwordComplexFnc)(this.passwordComplexRepository, password);

    if (passwordComplex) {
      throw new _AppError.AppError(passwordComplex);
    }

    const userToken = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new _AppError.AppError("Inválid Token!");
    }

    const tokenExpired = this.dateProvider.compareiIfBefore(userToken.expires_date, this.dateProvider.dateNow());

    if (tokenExpired) {
      throw new _AppError.AppError("Expired Token!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    user.password = await (0, _bcryptjs.hash)(password, 8);
    await this.usersRepository.create(user);
    await this.usersTokensRepository.deleteById(userToken.id);
  }

}) || _class);
exports.ResetPasswordUseCase = ResetPasswordUseCase;