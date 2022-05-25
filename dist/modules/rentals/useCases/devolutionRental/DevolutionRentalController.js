"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DevolutionRentalController = void 0;

var _tsyringe = require("tsyringe");

var _DevolutionRentalUseCase = require("./DevolutionRentalUseCase");

class DevolutionRentalController {
  async handle(request, response) {
    const devolutionRentalUseCase = _tsyringe.container.resolve(_DevolutionRentalUseCase.DevolutionRentalUseCase);

    const {
      id
    } = request.params;
    const user_id = await request.user.id;
    const rental = await devolutionRentalUseCase.execute({
      id,
      user_id
    });
    return response.status(201).json(rental);
  }

}

exports.DevolutionRentalController = DevolutionRentalController;