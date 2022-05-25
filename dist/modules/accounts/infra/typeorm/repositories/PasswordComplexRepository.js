"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordComplexRepository = void 0;

var _typeorm = require("typeorm");

var _PasswordComplex = require("@modules/accounts/infra/typeorm/entities/PasswordComplex");

class PasswordComplexRepository {
  constructor() {
    this.repository = (0, _typeorm.getRepository)(_PasswordComplex.PasswordComplex);
  }

  async create({
    qtt_characters,
    qtt_lowercase_characters,
    qtt_numeral_characters,
    qtt_special_characters,
    qtt_uppercase_characters
  }) {
    const passwordComplex = this.repository.create({
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters
    });
    await this.repository.save(passwordComplex);
    return passwordComplex;
  }

  async getOne() {
    const passwordComplex = await this.repository.findOne();
    return passwordComplex;
  }

}

exports.PasswordComplexRepository = PasswordComplexRepository;