import { ICreateSpecificationDTO } from "../../dtos/ICreateSpecificationDTO";
import { Specification } from "../../infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    await this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = await this.specifications.filter(
      (specification) => ids.includes(specification.id)
    );

    return allSpecifications;
  }
}

export { SpecificationsRepositoryInMemory };
