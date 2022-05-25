"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specification = require("../../infra/typeorm/entities/Specification");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      description,
      name
    });
    await this.specifications.push(specification);
    return specification;
  }

  async findByName(name) {
    const specification = await this.specifications.find(specification => specification.name === name);
    return specification;
  }

  async findByIds(ids) {
    const allSpecifications = await this.specifications.filter(specification => ids.includes(specification.id));
    return allSpecifications;
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;