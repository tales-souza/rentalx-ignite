import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";
import { Category } from "../infra/typeorm/entities/Category";

interface ICarsRepository {
  create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<void>;
  findByLicencePlate(license_plate: string): Promise<Car>;
  findCategoryById(category_id: string): Promise<Category>;
  findAvailableAll(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };
