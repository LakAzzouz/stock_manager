import bcrypt from "bcrypt";
import { PasswordGateway } from "../../core/gateways/PasswordGateway";

export class BCryptGateway implements PasswordGateway {
  hashPassword(password: string): string {
    const salt = 10
    const hashedPassword = bcrypt.hashSync(password, salt);
    return hashedPassword;
  }
  compare(password: string, hashedPassword: string): boolean {
    const isMatching = bcrypt.compareSync(password, hashedPassword);
    return isMatching;
  }
}
