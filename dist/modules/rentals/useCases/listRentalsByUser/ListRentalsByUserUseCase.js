"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListRentalsByUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

let ListRentalsByUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ListRentalsByUserUseCase {
  constructor(rentalsRepository) {
    this.rentalsRepository = rentalsRepository;
  }

  async execute(user_id) {
    const rentals = await this.rentalsRepository.findRentalsByUser(user_id);
    return rentals;
  }

}) || _class);
exports.ListRentalsByUserUseCase = ListRentalsByUserUseCase;