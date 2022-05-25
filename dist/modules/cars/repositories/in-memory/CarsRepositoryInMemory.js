"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;

var _Car = require("../../infra/typeorm/entities/Car");

class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
    this.categories = [{
      id: "60567651-b3c9-4672-ada4-01d83ff9e88a",
      name: "Sedan",
      description: "Automóvel de três volumes",
      created_at: new Date("2022-01-31T14:25:23.984Z")
    }];
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });
    await this.cars.push(car);
    return car;
  }

  async findByLicencePlate(license_plate) {
    const car = await this.cars.find(car => car.license_plate === license_plate);
    return car;
  }

  async findCategoryById(category_id) {
    const category = await this.categories.find(category => category.id === category_id);
    return category;
  }

  async findAvailableAll(brand, category_id, name) {
    const cars = await this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }

      return null;
    });
    return cars;
  }

  async findById(car_id) {
    const car = await this.cars.find(car => car.id === car_id);
    return car;
  }

  async updateAvailable(id, available) {
    const carIndex = await this.cars.findIndex(car => car.id === id);
    this.cars[carIndex].available = available;
  }

}

exports.CarsRepositoryInMemory = CarsRepositoryInMemory;