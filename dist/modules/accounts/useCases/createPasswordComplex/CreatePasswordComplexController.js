"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreatePasswordComplexController = void 0;

var _tsyringe = require("tsyringe");

var _CreatePasswordComplexUseCase = require("./CreatePasswordComplexUseCase");

class CreatePasswordComplexController {
  async handle(request, response) {
    const {
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters
    } = request.body;

    const createPasswordComplexUseCase = _tsyringe.container.resolve(_CreatePasswordComplexUseCase.CreatePasswordComplexUseCase);

    const passwordComplex = await createPasswordComplexUseCase.execute({
      qtt_characters,
      qtt_lowercase_characters,
      qtt_numeral_characters,
      qtt_special_characters,
      qtt_uppercase_characters
    });
    return response.status(201).json(passwordComplex);
  }

}

exports.CreatePasswordComplexController = CreatePasswordComplexController;