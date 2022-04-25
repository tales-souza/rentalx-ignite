import { injectable, inject } from "tsyringe";

import { User } from "../../infra/typeorm/entities/User";
import { UserMap } from "../../mapper/UserMap";
import { IUsersRepository } from "../../repositories/IUsersRepository";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    return UserMap.toDTO(user);
  }
}

export { ProfileUserUseCase };
