import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "../../../dtos/ICreateCarDTO";
import { ICarsRepository } from "../../../repositories/ICarsRepository";
import { Car } from "../entities/Car";
import { Category } from "../entities/Category";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;
  private categoryRepository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Car);
    this.categoryRepository = getRepository(Category);
  }
  async findCategoryById(category_id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      id: category_id,
    });

    return category;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);
  }
  async findByLicencePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({
      license_plate,
    });

    return car;
  }
}

export { CarsRepository };
