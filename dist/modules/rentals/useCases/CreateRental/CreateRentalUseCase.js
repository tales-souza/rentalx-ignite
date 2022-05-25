"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _class;

let CreateRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class CreateRentalUseCase {
  constructor(rentalsRepository, dateProvider, carsRepository) {
    this.rentalsRepository = rentalsRepository;
    this.dateProvider = dateProvider;
    this.carsRepository = carsRepository;
  }

  async execute({
    user_id,
    car_id,
    expected_return_date
  }) {
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new _AppError.AppError("Car is unavailable");
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new _AppError.AppError("There's a rental in progress for user");
    }

    const compare = this.dateProvider.compareInHours(this.dateProvider.dateNow(), expected_return_date);

    if (compare < 24) {
      throw new _AppError.AppError("Invalid return date");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    });
    await this.carsRepository.updateAvailable(car_id, false);
    return rental;
  }

}) || _class);
exports.CreateRentalUseCase = CreateRentalUseCase;