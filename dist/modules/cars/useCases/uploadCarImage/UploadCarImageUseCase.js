"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImageUseCase = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

let UploadCarImageUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class UploadCarImageUseCase {
  constructor(carsImageRepository, storageProvider) {
    this.carsImageRepository = carsImageRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    car_id,
    image_name
  }) {
    const carImage = await this.carsImageRepository.create(car_id, image_name);
    await this.storageProvider.save(image_name, "cars");
    return carImage;
  }

}) || _class);
exports.UploadCarImageUseCase = UploadCarImageUseCase;