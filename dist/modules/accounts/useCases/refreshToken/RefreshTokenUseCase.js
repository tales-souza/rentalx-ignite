"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RefreshTokenUseCase = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _tsyringe = require("tsyringe");

var _auth = _interopRequireDefault(require("@config/auth"));

var _AppError = require("@shared/errors/AppError");

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let RefreshTokenUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class RefreshTokenUseCase {
  constructor(usersTokensRepository, dateProvider) {
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
  }

  async execute(token) {
    const {
      email,
      sub
    } = (0, _jsonwebtoken.verify)(token, _auth.default.secret_refresh_token);
    const user_id = sub;
    const userToken = await this.usersTokensRepository.findByUserIdAndUserToken(user_id, token);

    if (!userToken) {
      throw new _AppError.AppError("Refresh Token does not exists");
    }

    await this.usersTokensRepository.deleteById(userToken.id);
    const refresh_token = (0, _jsonwebtoken.sign)({
      email
    }, _auth.default.secret_refresh_token, {
      subject: sub,
      expiresIn: _auth.default.expires_in_refresh_token
    });
    const expires_date = this.dateProvider.addDays(_auth.default.expires_in_refresh_token_days);
    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    });
    const newToken = (0, _jsonwebtoken.sign)({}, _auth.default.secret_token, {
      subject: user_id,
      expiresIn: _auth.default.expires_in_token
    });
    return {
      refresh_token,
      token: newToken
    };
  }

}) || _class);
exports.RefreshTokenUseCase = RefreshTokenUseCase;