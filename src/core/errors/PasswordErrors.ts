import { DomainErrors } from "./DomainErrors";

export namespace PasswordErrors {
  export class PasswordIncorrect extends DomainErrors {
    constructor() {
      super("PASSWORD_IS_INCORRECT");
    }
  }
}
