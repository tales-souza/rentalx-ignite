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
      category_id: "d3a20ce1-e8e5-475f-aa57-9f5852789801",
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
        category_id: "d3a20ce1-e8e5-475f-aa57-9f5852789801",
      });

      await createCarUseCase.execute({
        name: "Car name 2 ",
        description: "Car Description 2 ",
        daily_rate: 2,
        license_plate: "UAB-2540",
        fine_amount: 2,
        brand: "Car brand 2",
        category_id: "d3a20ce1-e8e5-475f-aa57-9f5852789800",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
