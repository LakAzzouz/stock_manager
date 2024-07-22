import { UserErrors } from "../../errors/UserErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { Usecases } from "../Usecase";

type DeleteUserInput = {
  id: string;
};

export class DeleteUser implements Usecases<DeleteUserInput, Promise<void>> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(input: DeleteUserInput): Promise<void> {
    const { id } = input;

    const user = await this._userRepository.getById(id);

    if (!user) {
      throw new UserErrors.UserNotFound();
    }

    await this._userRepository.delete(user.props.id);

    return;
  }
}
