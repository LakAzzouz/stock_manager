import { UserRepository } from "../../repositories/UserRepository";
import { Usecases } from "../Usecase";

type DeleteUserInput = {
  id: string;
};

export class DeleteUser implements Usecases<DeleteUserInput, Promise<void>> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(input: DeleteUserInput): Promise<void> {
    await this._userRepository.delete(input.id);

    return;
  }
}
