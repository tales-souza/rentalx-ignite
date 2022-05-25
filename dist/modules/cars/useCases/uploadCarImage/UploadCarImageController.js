"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageController = void 0;

var _tsyringe = require("tsyringe");

var _UploadCarImageUseCase = require("./UploadCarImageUseCase");

class UploadCarImageController {
  async handle(request, response) {
    const image_name = request.file.filename;
    const car_id = request.params.id;

    const uploadCarImageUseCase = _tsyringe.container.resolve(_UploadCarImageUseCase.UploadCarImageUseCase);

    const carImage = await uploadCarImageUseCase.execute({
      car_id,
      image_name
    });
    return response.status(201).json(carImage);
  }

}

exports.UploadCarImageController = UploadCarImageController;