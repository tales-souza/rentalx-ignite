"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");

var _UsersTokensRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory");

var _DayJsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");

var _AppError = require("@shared/errors/AppError");

var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");

let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let dateProvider;
let usersTokensRepositoryInMemory;
let mailProvider;
describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayJsDateProvider.DayJsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokensRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "748456",
      email: "testedev@teste.com",
      name: "Teste Dev",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("testedev@teste.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("ka@uj.gr")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "748456",
      email: "abome@teste.com",
      name: "Teste Dev 2",
      password: "1234"
    });
    await sendForgotPasswordMailUseCase.execute("abome@teste.com");
    expect(generateTokenMail).toBeCalled();
  });
});