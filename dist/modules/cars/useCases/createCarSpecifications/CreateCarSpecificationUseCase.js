"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarSpecificationsUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _class;

let CreateCarSpecificationsUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateCarSpecificationsUseCase {
  constructor(carsRepository, specificationsRepository) {
    this.carsRepository = carsRepository;
    this.specificationsRepository = specificationsRepository;
  }

  async execute({
    car_id,
    specifications_id
  }) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new _AppError.AppError("Car does not exists");
    }

    const specifications = await this.specificationsRepository.findByIds(specifications_id);
    carExists.specifications = specifications;
    await this.carsRepository.create(carExists);
    return carExists;
  }

}) || _class);
exports.CreateCarSpecificationsUseCase = CreateCarSpecificationsUseCase;