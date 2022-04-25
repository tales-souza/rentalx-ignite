import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
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
    private carsImageRepository: ICarsImageRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async execute({ car_id, image_name }: IRequest): Promise<CarsImage> {
    const carImage = await this.carsImageRepository.create(car_id, image_name);
    await this.storageProvider.save(image_name, "cars");

    return carImage;
  }
}

export { UploadCarImageUseCase };
