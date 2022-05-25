"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetPasswordComplexController = void 0;

var _tsyringe = require("tsyringe");

var _GetPasswordComplexUseCase = require("./GetPasswordComplexUseCase");

class GetPasswordComplexController {
  async handle(request, response) {
    const getPasswordComplexUseCase = _tsyringe.container.resolve(_GetPasswordComplexUseCase.GetPasswordComplexUseCase);

    const passwordComplex = await getPasswordComplexUseCase.execute();
    return response.status(200).json(passwordComplex);
  }

}

exports.GetPasswordComplexController = GetPasswordComplexController;