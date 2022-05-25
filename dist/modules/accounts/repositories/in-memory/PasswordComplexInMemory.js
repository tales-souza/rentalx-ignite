"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordComplexInMemory = void 0;

var _PasswordComplex = require("@modules/accounts/infra/typeorm/entities/PasswordComplex");

class PasswordComplexInMemory {
  constructor() {
    this.passwordComplexities = [];
  }

  async create({
    qtt_characters,
    qtt_lowercase_characters,
    qtt_numeral_characters,
    qtt_special_characters,
    qtt_uppercase_characters
  }) {
    const passwordComplex = new _PasswordComplex.PasswordComplex();
    Object.assign(passwordComplex, {
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters
    });
    this.passwordComplexities.push(passwordComplex);
    return passwordComplex;
  }

  async getOne() {
    const passwordComplex = this.passwordComplexities[0];
    return passwordComplex;
  }

}

exports.PasswordComplexInMemory = PasswordComplexInMemory;