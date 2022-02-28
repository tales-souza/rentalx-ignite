import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = {
      name: "Clássic B23",
      description: "Carro Clássic. ideal para toda a família",
      daily_rate: 150,
      license_plate: "OAB-2543",
      fine_amount: 80,
      brand: "chevrolet",
      category_id: "f3233342-0687-4172-8850-91a95720144a",
    };

    await carsRepositoryInMemory.create(car);

    const cars = await listCarsUseCase.execute({});

    expect(cars[0].available).toBe(true);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = {
      name: "Clássic B23",
      description: "Carro Clássic. ideal para toda a família",
      daily_rate: 150,
      license_plate: "OAB-2544",
      fine_amount: 80,
      brand: "fiat",
      category_id: "f3233342-0687-4172-8850-91a95720144a",
    };

    await carsRepositoryInMemory.create(car);

    const cars = await listCarsUseCase.execute({ brand: car.brand });

    expect(cars[0].brand).toBe(car.brand);
  });

  it("shoud be able to list all available cars by name", async () => {
    const car = {
      name: "Range Hover 2012",
      description: "Range Hover 2012. ideal para viagens",
      daily_rate: 280,
      license_plate: "OAB-2545",
      fine_amount: 150,
      brand: "Range Hover",
      category_id: "f3233342-0687-4172-8850-91a95720144a",
    };

    await carsRepositoryInMemory.create(car);

    const cars = await listCarsUseCase.execute({ name: car.name });

    expect(cars[0].name).toBe(car.name);
  });

  it("shoud be able to list all available cars by category_id", async () => {
    const car = {
      name: "Range Hover 2013",
      description: "Range Hover 2013. ideal para viagens",
      daily_rate: 300,
      license_plate: "OAB-2546",
      fine_amount: 170,
      brand: "Range Hover",
      category_id: "f3233342-0687-4172-8850-91a95720144a",
    };

    await carsRepositoryInMemory.create(car);

    const cars = await listCarsUseCase.execute({
      category_id: car.category_id,
    });

    expect(cars[0].category_id).toBe(car.category_id);
  });
});
