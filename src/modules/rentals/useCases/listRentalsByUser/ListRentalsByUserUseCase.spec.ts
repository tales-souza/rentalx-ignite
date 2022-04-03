import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { ListRentalsByUserUseCase } from "./ListRentalsByUserUseCase";

describe("List rentals by user", () => {
  let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
  let listRentalsByUserUseCase: ListRentalsByUserUseCase;

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    listRentalsByUserUseCase = new ListRentalsByUserUseCase(
      rentalsRepositoryInMemory
    );
  });

  it("should able to list rentals by user", async () => {
    return null;
  });
});
