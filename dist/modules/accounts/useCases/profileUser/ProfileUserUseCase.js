"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProfileUserUseCase = void 0;

var _tsyringe = require("tsyringe");

var _UserMap = require("@modules/accounts/mapper/UserMap");

var _dec, _class;

let ProfileUserUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class ProfileUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute(user_id) {
    const user = await this.usersRepository.findById(user_id);
    return _UserMap.UserMap.toDTO(user);
  }

}) || _class);
exports.ProfileUserUseCase = ProfileUserUseCase;