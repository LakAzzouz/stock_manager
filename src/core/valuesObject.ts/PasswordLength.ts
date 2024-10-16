import { UserErrors } from "../errors/UserErrors";

const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class Password {
  static validate(password: string): string {
    if (!re.test(password)) {
      throw new UserErrors.InvalidPassword();
    }
    return password;
  }
}
