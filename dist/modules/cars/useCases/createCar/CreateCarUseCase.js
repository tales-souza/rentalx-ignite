"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _class;

let CreateCarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateCarUseCase {
  constructor(carsRepository) {
    this.carsRepository = carsRepository;
  }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }) {
    const carAlreadyExists = await this.carsRepository.findByLicencePlate(license_plate);

    if (carAlreadyExists) {
      throw new _AppError.AppError("Car already exists!", 400);
    }

    const category = await this.carsRepository.findCategoryById(category_id);

    if (!category) {
      throw new _AppError.AppError("Non-existent reported category");
    }

    await this.carsRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
  }

}) || _class);
exports.CreateCarUseCase = CreateCarUseCase;