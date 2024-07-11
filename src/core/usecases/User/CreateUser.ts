import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { EmailGateway } from "../../gateways/EmailGateway";
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
    private readonly _passwordGateway: PasswordGateway,
    private readonly _emailGateway: EmailGateway
  ) {}

  async execute(input: CreateUserInput): Promise<User> {
    const { username, email, password } = input;

    const userAlreadyExist = await this._userRepository.getByEmail(email);
    
    if (userAlreadyExist) {
      throw new UserErrors.AlreadyExist();
    }

    const passwordValidated = Password.validate(password);

    const hachedPassword = this._passwordGateway.hashPassword(passwordValidated);

    const sixDigitVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = User.create({
      username,
      email,
      password: hachedPassword,
      resetPasswordCode: "",
      verifyEmailCode: sixDigitVerificationCode
    });

    this._userRepository.save(user);

    await this._emailGateway.sendEmail(email, sixDigitVerificationCode, username);

    return user;
  }
}
