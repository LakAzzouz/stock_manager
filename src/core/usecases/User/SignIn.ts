import { User } from "../../entities/User";
import { PasswordErrors } from "../../errors/PasswordErrors";
import { UserErrors } from "../../errors/UserErrors";
import { PasswordGateway } from "../../gateways/PasswordGateway";
import { UserRepository } from "../../repositories/UserRepository";
import { Usecases } from "../Usecase";

type SignInInput = {
  email: string;
  password: string;
};

export class SignIn implements Usecases<SignInInput, Promise<User>> {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _passwordGateway: PasswordGateway
  ) {}

  async execute(input: SignInInput): Promise<User> {
    const { email, password } = input;

    const user = await this._userRepository.getByEmail(email);

    if (!user) {
      throw new UserErrors.EmailNotFound();
    }

    console.log(user)

    if(!user.props.isVerified) {
      throw new UserErrors.NotVerified();
    }

    const isMatching = this._passwordGateway.compare(password, user.props.password);

    if (!isMatching) {
      throw new PasswordErrors.PasswordIncorrect();
    }

    return user;
  }
}
