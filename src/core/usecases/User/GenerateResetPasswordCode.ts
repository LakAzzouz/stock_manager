import { UserErrors } from "../../errors/UserErrors";
import { EmailGateway } from "../../gateways/EmailGateway";
import { UserRepository } from "../../repositories/UserRepository";
import { Email } from "../../valuesObject.ts/Email";
import { Usecases } from "../Usecase";

type GenerateResetPasswordCodeInput = {
  email: string;
  username: string;
  resetPasswordCode: string;
};

export class GenerateResetPasswordCode implements Usecases<GenerateResetPasswordCodeInput, Promise<void>>{
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _emailGateway: EmailGateway
  ) {}

  async execute(input: GenerateResetPasswordCodeInput): Promise<void> {
    const { resetPasswordCode, email, username } = input;

    const user = await this._userRepository.getByEmail(email);

    if (!user) {
      throw new UserErrors.UserNotFound();
    }

    Email.validate(email);

    const userUpdated = user.update(resetPasswordCode);

    // =============> console.log(userUpdated)

    await this._userRepository.update(userUpdated);

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await this._emailGateway.sendEmail({ email, message: code, username });

    return;
  }
}
