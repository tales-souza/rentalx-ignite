import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("shold be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Car name",
      description: "Car Description",
      daily_rate: 1,
      license_plate: "Car License plate",
      fine_amount: 1,
      brand: "Car brand",
      category_id: "60567651-b3c9-4672-ada4-01d83ff9e88a",
    });
  });

  it("shold not be able to create a car with exists licence plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Car name",
        description: "Car Description",
        daily_rate: 1,
        license_plate: "UAB-2540",
        fine_amount: 1,
        brand: "Car brand",
        category_id: "60567651-b3c9-4672-ada4-01d83ff9e88a",
      });

      await createCarUseCase.execute({
        name: "Car name 2 ",
        description: "Car Description 2 ",
        daily_rate: 2,
        license_plate: "UAB-2540",
        fine_amount: 2,
        brand: "Car brand 2",
        category_id: "60567651-b3c9-4672-ada4-01d83ff9e88a",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car a with available true by default", async () => {
    const car = {
      name: "Car available",
      description: "Car Description 2 ",
      daily_rate: 2,
      license_plate: "UABD-2540",
      fine_amount: 2,
      brand: "Car brand 2",
      category_id: "60567651-b3c9-4672-ada4-01d83ff9e88a",
    };

    await createCarUseCase.execute(car);

    const carAvailable = await carsRepositoryInMemory.findByLicencePlate(
      car.license_plate
    );

    expect(carAvailable.available).toBe(true);
  });

  it("should not be able to create a car a with non-existent category", () => {
    expect(async () => {
      const car = {
        name: "Car available",
        description: "Car Description 2 ",
        daily_rate: 2,
        license_plate: "UABD-2540",
        fine_amount: 2,
        brand: "Car brand 2",
        category_id: "d3a20ce1-e8e5-475f-aa57-9f5852789800",
      };

      await createCarUseCase.execute(car);
    }).rejects.toBeInstanceOf(AppError);
  });
});
