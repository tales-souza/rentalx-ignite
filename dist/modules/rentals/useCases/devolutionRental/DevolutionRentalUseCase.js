"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalUseCase = void 0;

var _tsyringe = require("tsyringe");

var _AppError = require("../../../../shared/errors/AppError");

var _dec, _class;

let DevolutionRentalUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class DevolutionRentalUseCase {
  constructor(rentalsRepository, carsRepository, dateProvider) {
    this.rentalsRepository = rentalsRepository;
    this.carsRepository = carsRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    id,
    user_id
  }) {
    const minimum_daily = 1;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new _AppError.AppError("Rental does not exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);
    const dateNow = this.dateProvider.dateNow();
    let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);

    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(rental.expected_return_date, dateNow);
    let total = 0;

    if (delay > 0) {
      total = delay * car.fine_amount;
    }

    total += daily * car.daily_rate;
    rental.end_date = dateNow;
    rental.total = total;
    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);
    return rental;
  }

}) || _class);
exports.DevolutionRentalUseCase = DevolutionRentalUseCase;