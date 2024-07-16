import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { Usecases } from "../Usecase";

type GetUserByIdInput = {
  id: string;
};

export class GetUserById implements Usecases<GetUserByIdInput, Promise<User>> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(input: GetUserByIdInput): Promise<User> {
    const user = await this._userRepository.getById(input.id);

    if (!user) {
      throw new UserErrors.UserNotFound();
    }

    return user;
  }
}
