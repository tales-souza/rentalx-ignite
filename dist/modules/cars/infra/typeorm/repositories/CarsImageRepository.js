"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImageRepository = void 0;

var _typeorm = require("typeorm");

var _CarsImage = require("../entities/CarsImage");

class CarsImageRepository {
  constructor() {
    this.repository = (0, _typeorm.getRepository)(_CarsImage.CarsImage);
  }

  async create(car_id, image_name) {
    const carImage = this.repository.create({
      car_id,
      image_name
    });
    await this.repository.save(carImage);
    return carImage;
  }

}

exports.CarsImageRepository = CarsImageRepository;