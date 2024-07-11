import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { Usecases } from "../Usecase";

type VerifyEmailInput = {
  email: string;
};

export class VerifyEmail implements Usecases<VerifyEmailInput, Promise<User>> {
  constructor(
    private readonly _userRepository: UserRepository) {}

  async execute(input: VerifyEmailInput): Promise<User> {
    const email = input;

    
    return user
  }
}
