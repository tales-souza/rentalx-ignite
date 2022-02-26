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
  }: ICreateCarDTO): Promise<void> {
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
}

export { CarsRepositoryInMemory };
