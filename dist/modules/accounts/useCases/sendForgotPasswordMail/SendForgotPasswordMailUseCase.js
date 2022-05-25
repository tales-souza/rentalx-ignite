"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailUseCase = void 0;

var _path = require("path");

var _tsyringe = require("tsyringe");

var _uuid = require("uuid");

var _AppError = require("@shared/errors/AppError");

var _dec, _class;

let SendForgotPasswordMailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class SendForgotPasswordMailUseCase {
  constructor(usersRepository, UsersTokensRepository, dateProvider, mailProvider) {
    this.usersRepository = usersRepository;
    this.UsersTokensRepository = UsersTokensRepository;
    this.dateProvider = dateProvider;
    this.mailProvider = mailProvider;
  }

  async execute(email) {
    const templatePath = (0, _path.resolve)(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError("User does not exists");
    }

    const token = (0, _uuid.v4)();
    const expires_date = this.dateProvider.addHours(3);
    await this.UsersTokensRepository.create({
      expires_date,
      refresh_token: token,
      user_id: user.id
    });
    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };
    await this.mailProvider.sendMail(email, "Recuperação de senha", variables, templatePath);
  }

}) || _class);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;