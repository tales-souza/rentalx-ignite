import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { Category } from "../../infra/typeorm/entities/Category";
import { ICategoriesRepository } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  public categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const returnCategory = this.categories.find(
      (category) => category.name === name
    );

    return returnCategory;
  }
  async list(): Promise<Category[]> {
    const list = this.categories;
    return list;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
