"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserUseCase = void 0;

var _bcryptjs = require("bcryptjs");

var _tsyringe = require("tsyringe");

var _AppError = require("@shared/errors/AppError");

var _passwordComplexFnc = require("@utils/passwordComplexFnc");

var _dec, _class;

let CreateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateUserUseCase {
  constructor(usersRepository, passwordComplexRepository) {
    this.usersRepository = usersRepository;
    this.passwordComplexRepository = passwordComplexRepository;
  }

  async execute({
    name,
    email,
    password,
    driver_license
  }) {
    const passwordComplex = await (0, _passwordComplexFnc.passwordComplexFnc)(this.passwordComplexRepository, password);

    if (passwordComplex) {
      throw new _AppError.AppError(passwordComplex);
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new _AppError.AppError("User already exists", 400);
    }

    const hashPassword = await (0, _bcryptjs.hash)(password, 8);
    await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
      driver_license
    });
  }

}) || _class);
exports.CreateUserUseCase = CreateUserUseCase;