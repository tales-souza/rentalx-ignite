"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListAvailableCarsUseCase = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

let ListAvailableCarsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ListAvailableCarsUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({
    brand,
    category_id,
    name
  }) {
    const cars = await this.carsRepository.findAvailableAll(brand, category_id, name);
    return cars;
  }

}) || _class);
exports.ListAvailableCarsUseCase = ListAvailableCarsUseCase;