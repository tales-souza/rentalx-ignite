"use strict";

var _PasswordComplexInMemory = require("@modules/accounts/repositories/in-memory/PasswordComplexInMemory");

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _AuthenticateUserUseCase = require("@modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase");

var _CreateUserUseCase = require("@modules/accounts/useCases/createUser/CreateUserUseCase");

var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _AppError = require("@shared/errors/AppError");

let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let passwordComplexRepository;
let authenticateUserUseCase;
let createUserUseCase;
let dateProvider;
describe("Authenticate User", () => {
  beforeEach(async () => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayJsDateProvider.DayJsDateProvider();
    authenticateUserUseCase = new _AuthenticateUserUseCase.AuthenticateUserUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    passwordComplexRepository = new _PasswordComplexInMemory.PasswordComplexInMemory();
    await passwordComplexRepository.create({
      qtt_characters: 0,
      qtt_lowercase_characters: 0,
      qtt_numeral_characters: 0,
      qtt_special_characters: 0,
      qtt_uppercase_characters: 0
    });
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory, passwordComplexRepository);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "00123",
      email: "teste@testeme.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("shold not be able to authenticate an noneexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@email.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or Password incorrect", 401));
  });
  it("shold not be able to authenticate with incorret password", async () => {
    const user = {
      driver_license: "00123",
      email: "teste@testeme.com",
      password: "1234",
      name: "User Test"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "12345"
    })).rejects.toEqual(new _AppError.AppError("Email or Password incorrect", 401));
  });
});