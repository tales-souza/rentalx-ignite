"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayJsDateProvider = require("../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider");

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../../cars/repositories/in-memory/CarsRepositoryInMemory");

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _CreateRentalUseCase = require("./CreateRentalUseCase");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let rentalsRepositoryInMemory;
let dayJsDateProvider;
let carsRepositoryInMemory;
describe("Create Rental", () => {
  const dayAdd24Hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayJsDateProvider = new _DayJsDateProvider.DayJsDateProvider();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalUseCase.CreateRentalUseCase(rentalsRepositoryInMemory, dayJsDateProvider, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      user_id: "1233",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const car2 = await carsRepositoryInMemory.create({
      name: "Test2",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test2",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand2"
    });
    await createRentalUseCase.execute({
      user_id: "1233",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "1233",
      car_id: car2.id,
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user"));
  });
  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    await createRentalUseCase.execute({
      user_id: "123",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    });
    await expect(createRentalUseCase.execute({
      user_id: "456",
      car_id: car.id,
      expected_return_date: dayAdd24Hours
    })).rejects.toEqual(new _AppError.AppError("Car is unavailable"));
  });
  it("should not be able to create a new rental with invalid return date", async () => {
    await expect(createRentalUseCase.execute({
      user_id: "123",
      car_id: "test",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalid return date"));
  });
});