import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const image_name = request.file.filename;
    const car_id = request.params.id;

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const carImage = await uploadCarImageUseCase.execute({
      car_id,
      image_name,
    });

    return response.status(201).json(carImage);
  }
}

export { UploadCarImageController };
