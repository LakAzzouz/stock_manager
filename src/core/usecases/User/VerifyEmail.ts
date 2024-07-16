import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { Usecases } from "../Usecase";

type VerifyEmailInput = {
  email: string;
  code: string;
};

export class VerifyEmail implements Usecases<VerifyEmailInput, Promise<User>> {
  constructor(
    private readonly _userRepository: UserRepository) {}

  async execute(input: VerifyEmailInput): Promise<User> {
    const { email, code } = input;

    const user = await this._userRepository.getByEmail(email);

    if(!user) {
      throw new UserErrors.UserNotFound();
    }

    if(user.props.verifyEmailCode != code) {
      throw new UserErrors.InvalidCode();
    }

    user.verifyEmail();

    // Vérifier si le sixDigit match 

    await this._userRepository.update(user);
        
    return user
  }
}
