"use strict";

var _RentalsRepositoryInMemory = require("../../repositories/in-memory/RentalsRepositoryInMemory");

var _ListRentalsByUserUseCase = require("./ListRentalsByUserUseCase");

describe("List rentals by user", () => {
  let rentalsRepositoryInMemory;
  let listRentalsByUserUseCase;
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    listRentalsByUserUseCase = new _ListRentalsByUserUseCase.ListRentalsByUserUseCase(rentalsRepositoryInMemory);
  });
  it("should able to list rentals by user", async () => {
    return null;
  });
});