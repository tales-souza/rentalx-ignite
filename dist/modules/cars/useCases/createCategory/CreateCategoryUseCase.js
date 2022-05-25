"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _class;

let CreateCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute({
    description,
    name
  }) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new _AppError.AppError("Category already exists", 400);
    }

    this.categoriesRepository.create({
      name,
      description
    });
  }

}) || _class);
exports.CreateCategoryUseCase = CreateCategoryUseCase;