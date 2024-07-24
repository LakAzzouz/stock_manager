import { eventEmitter } from "../../../messages/EventEmitter";
import { UserCreated } from "../../../messages/user/UserCreated";
import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { PasswordGateway } from "../../gateways/PasswordGateway";
import { UserRepository } from "../../repositories/UserRepository";
import { Password } from "../../valuesObject.ts/PasswordLength";
import { Usecases } from "../Usecase";

type CreateUserInput = {
  username: string;
  email: string;
  password: string;
};

export class CreateUser implements Usecases<CreateUserInput, Promise<User>> {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _passwordGateway: PasswordGateway
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const { username, email, password } = input;

    const userAlreadyExist = await this._userRepository.getByEmail(email);

    if (userAlreadyExist) {
      throw new UserErrors.AlreadyExist();
    }

    const passwordValidated = Password.validate(password);

    const hachedPassword = this._passwordGateway.hashPassword(passwordValidated);

    // Haché le sixDigit

    const user = User.create({
      username,
      email,
      password: hachedPassword,
      resetPasswordCode: ""
    });

    this._userRepository.save(user);

    const event = new UserCreated ({
      id: user.props.id,
      email,
      username
    });

    eventEmitter.emit("user_created", event);

    return user;
  }
}
