import { UserErrors } from "../errors/UserErrors";

export class Email {
  static validate(email: string): string {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new UserErrors.EmailFormat();
    }
    return email;
  }
}
