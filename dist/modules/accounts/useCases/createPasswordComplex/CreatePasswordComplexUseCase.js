"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePasswordComplexUseCase = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

let CreatePasswordComplexUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreatePasswordComplexUseCase {
  constructor(iPasswordComplexRepository) {
    this.iPasswordComplexRepository = iPasswordComplexRepository;
  }

  async execute({
    qtt_characters,
    qtt_lowercase_characters,
    qtt_numeral_characters,
    qtt_special_characters,
    qtt_uppercase_characters
  }) {
    const password_complex = await this.iPasswordComplexRepository.create({
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters
    });
    return password_complex;
  }

}) || _class);
exports.CreatePasswordComplexUseCase = CreatePasswordComplexUseCase;