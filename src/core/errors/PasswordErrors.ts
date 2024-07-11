import { DomainErrors } from "./DomainErrors";

export namespace PasswordErrors {
  export class PasswordIncorrect extends DomainErrors {
    constructor() {
      super("PASSWORD_IS_INCORRECT")
    }
  }
  export class LengthShort extends DomainErrors {
    constructor() {
      super("PASSWORD_TOO_SHORT");
    }
  }

  export class LengthLong extends DomainErrors {
    constructor() {
      super("PASSWORD_TOO_LONG");
    }
  }

  export class PasswordFormat extends DomainErrors {
    constructor() {
      super("UNSUITABLE_FORMAT");
    }
  }
}
