"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _class;

let CreateSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateSpecificationUseCase {
  constructor(specificationsRepository) {
    this.specificationsRepository = specificationsRepository;
  }

  async execute({
    name,
    description
  }) {
    const specification = await this.specificationsRepository.findByName(name);

    if (specification) {
      throw new _AppError.AppError("Specification already exists", 400);
    }

    await this.specificationsRepository.create({
      name,
      description
    });
  }

}) || _class);
exports.CreateSpecificationUseCase = CreateSpecificationUseCase;