import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { Usecases } from "../Usecase";

type VerifyResetPasswordCodeInput = {
  email: string;
  password: string;
  code: string;
};

export class VerifyResetPasswordCode implements Usecases<VerifyResetPasswordCodeInput, Promise<User>> {
  constructor(private readonly _userRepository: UserRepository) {}

  async execute(input: VerifyResetPasswordCodeInput): Promise<User> {
    const { email, password, code} = input;

    const user = await this._userRepository.getByEmail(email);

    if(!user) {
        throw new UserErrors.UserNotFound();
    }

    const userUpdated = user.props.password = password

    user.update(userUpdated)

    await this._userRepository.save(user)

    return user;
  }
}
