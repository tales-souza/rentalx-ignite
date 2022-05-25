"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoryUseCase = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

let ListCategoryUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ListCategoryUseCase {
  constructor(categoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }

  async execute() {
    const categories = await this.categoriesRepository.list();
    return categories;
  }

}) || _class);
exports.ListCategoryUseCase = ListCategoryUseCase;