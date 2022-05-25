"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _dec, _class;

let UpdateUserAvatarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec(_class = class UpdateUserAvatarUseCase {
  constructor(usersRepository, storageProvider) {
    this.usersRepository = usersRepository;
    this.storageProvider = storageProvider;
  } // Adicionar coluna avatar na tabela de users,
  // Refatorar usuário com coluna avatar
  // Configuracao upload multer
  // Criar regra de negócio do upload
  // Criar controller


  async execute({
    user_id,
    avatar_file
  }) {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatar_file, "avatar");
    user.avatar = avatar_file;
    await this.usersRepository.create(user);
  }

}) || _class);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;