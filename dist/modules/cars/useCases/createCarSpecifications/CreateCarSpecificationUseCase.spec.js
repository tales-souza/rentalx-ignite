"use strict";

var _AppError = require("../../../../shared/errors/AppError");

var _CarsRepositoryInMemory = require("../../repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationsRepositoryInMemory = require("../../repositories/in-memory/SpecificationsRepositoryInMemory");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let carsRepositoryInMemory;
let specificationsRepositoryInMemory;
let createCarSpecificationUseCase;
describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new _SpecificationsRepositoryInMemory.SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationsUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });
  it("should not able to add a new specification to the car not existent ", async () => {
    const car_id = "1234";
    const specifications_id = ["456"];
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Car does not exists"));
  });
  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car name",
      description: "Car Description",
      daily_rate: 1,
      license_plate: "Car License plate",
      fine_amount: 1,
      brand: "Car brand",
      category_id: "60567651-b3c9-4672-ada4-01d83ff9e88a"
    });
    const specification = await specificationsRepositoryInMemory.create({
      description: "test",
      name: "test"
    });
    const specifications_id = [specification.id];
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications.length).toBe(1);
  });
});