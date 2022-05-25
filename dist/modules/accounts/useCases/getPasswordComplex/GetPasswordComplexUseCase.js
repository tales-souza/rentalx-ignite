"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPasswordComplexUseCase = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

let GetPasswordComplexUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class GetPasswordComplexUseCase {
  constructor(ipasswordComplexRepository) {
    this.ipasswordComplexRepository = ipasswordComplexRepository;
  }

  async execute() {
    const complexPassword = await this.ipasswordComplexRepository.getOne();
    return complexPassword;
  }

}) || _class);
exports.GetPasswordComplexUseCase = GetPasswordComplexUseCase;