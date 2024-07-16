import { UserErrors } from "../../errors/UserErrors";
import { EmailGateway } from "../../gateways/EmailGateway";
import { UserRepository } from "../../repositories/UserRepository";
import { Email } from "../../valuesObject.ts/Email";
import { Usecases } from "../Usecase";

type SendEmailInput = {
  id: string;
  email: string;
  username: string;
};

export class SendEmail implements Usecases<SendEmailInput, Promise<void>> {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _emailGateway: EmailGateway
  ) {}

  async execute(input: SendEmailInput): Promise<void> {
    const { email, username, id } = input;

    const user = await this._userRepository.getById(id);

    if (!user) {
      throw new UserErrors.UserNotFound();
    }

    Email.validate(email)

    const code = user.props.verifyEmailCode;

    if(!code) {
      throw new Error("CODE_NOT_FOUND")
    }

    await this._emailGateway.sendEmail({ email, message: code, username });

    return;
  }
}
