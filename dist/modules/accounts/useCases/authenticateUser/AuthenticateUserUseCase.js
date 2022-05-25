"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthenticateUserUseCase = void 0;

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("@config/auth"));

var _AppError = require("@shared/errors/AppError");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AuthenticateUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class AuthenticateUserUseCase {
  constructor(userRepository, usersTokensRepository, dateProvider) {
    this.userRepository = userRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    email,
    password
  }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new _AppError.AppError("Email or Password incorrect", 401);
    }

    const passwordMatch = await (0, _bcryptjs.compare)(password, user.password);

    if (!passwordMatch) {
      throw new _AppError.AppError("Email or Password incorrect", 401);
    }

    const token = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_token
    });
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: user.id,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const refresh_token_expirer_date = this.dateProvider.addDays(_auth.default.expires_in_refresh_token_days);
    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expirer_date
    });
    const userReturn = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refresh_token
    };
    return userReturn;
  }

}) || _class);
exports.AuthenticateUserUseCase = AuthenticateUserUseCase;