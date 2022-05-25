"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepository = void 0;

var _typeorm = require("typeorm");

var _Car = require("../entities/Car");

var _Category = require("../entities/Category");

class CarsRepository {
  constructor() {
    this.repository = (0, _typeorm.getRepository)(_Car.Car);
    this.categoryRepository = (0, _typeorm.getRepository)(_Category.Category);
  }

  async findCategoryById(category_id) {
    const category = await this.categoryRepository.findOne({
      id: category_id
    });
    return category;
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
    specifications,
    id
  }) {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicencePlate(license_plate) {
    const car = await this.repository.findOne({
      license_plate
    });
    return car;
  }

  async findAvailableAll(brand, category_id, name) {
    const carsQuery = await this.repository.createQueryBuilder("c").where("available = :available", {
      available: true
    });

    if (brand) {
      carsQuery.andWhere("c.brand = :brand", {
        brand
      });
    }

    if (name) {
      carsQuery.andWhere("c.name = :name", {
        name
      });
    }

    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", {
        category_id
      });
    }

    const cars = await carsQuery.getMany();
    return cars;
  }

  async findById(car_id) {
    const car = await this.repository.findOne(car_id);
    return car;
  }

  async updateAvailable(id, available) {
    await this.repository.createQueryBuilder().update().set({
      available
    }).where("id = :id").setParameters({
      id
    }).execute();
  }

}

exports.CarsRepository = CarsRepository;