import { inject, injectable } from "tsyringe";

import { CarsImage } from "../../infra/typeorm/entities/CarsImage";
import { ICarsImageRepository } from "../../repositories/ICarsImageRepository";

interface IRequest {
  car_id: string;
  image_name: string;
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private carsImageRepository: ICarsImageRepository
  ) {}

  async execute({ car_id, image_name }: IRequest): Promise<CarsImage> {
    const carImage = await this.carsImageRepository.create(car_id, image_name);
    return carImage;
  }
}

export { UploadCarImageUseCase };
