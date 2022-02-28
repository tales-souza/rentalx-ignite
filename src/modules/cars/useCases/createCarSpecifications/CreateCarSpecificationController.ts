import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationsUseCase } from "./CreateCarSpecificationUseCase";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const { specifications_id } = request.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationsUseCase
    );

    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    });

    return response.status(201).json(cars);
  }
}

export { CreateCarSpecificationController };
