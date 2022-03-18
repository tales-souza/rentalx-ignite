import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];
  categories: Category[] = [
    {
      id: "60567651-b3c9-4672-ada4-01d83ff9e88a",
      name: "Sedan",
      description: "Automóvel de três volumes",
      created_at: new Date("2022-01-31T14:25:23.984Z"),
    },
  ];

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.cars.push(car);

    return car;
  }

  async findByLicencePlate(license_plate: string): Promise<Car> {
    const car = await this.cars.find(
      (car) => car.license_plate === license_plate
    );
    return car;
  }

  async findCategoryById(category_id: string): Promise<Category> {
    const category = await this.categories.find(
      (category) => category.id === category_id
    );

    return category;
  }

  async findAvailableAll(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const cars = await this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });
    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.cars.find((car) => car.id === car_id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = await this.cars.findIndex((car) => car.id === id);
    this.cars[carIndex].available = available;
  }
}

export { CarsRepositoryInMemory };
