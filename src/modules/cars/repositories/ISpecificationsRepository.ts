import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import { Specification } from "../entities/Specification";

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO);
  findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
