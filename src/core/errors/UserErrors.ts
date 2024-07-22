import { DomainErrors } from "./DomainErrors";

export namespace UserErrors {
  export class EmailNotFound extends DomainErrors {
    constructor() {
      super("EMAIL_NOT_FOUND");
    }
  }
  export class UserNotFound extends DomainErrors {
    constructor() {
      super("USER_NOT_FOUND");
    }
  }

  export class AlreadyExist extends DomainErrors {
    constructor() {
      super("USER_ALREADY_EXIST");
    }
  }

  export class InvalidPassword extends DomainErrors {
    constructor() {
      super(`The password must be : 
      At least one upper case English letter, 
      At least one lower case English letter, 
      At least one digit,
      At least one special character, 
      Minimum eight in length`);
    }
  }

  export class NotVerified extends DomainErrors {
    constructor() {
      super("USER_IS_NOT_VERIFIED");
    }
  }

  export class InvalidCode extends DomainErrors {
    constructor() {
      super("CODE_DOES_NOT_MATCH");
    }
  }

  export class EmailFormat extends DomainErrors {
    constructor() {
      super("EMAIL_FORMAT_INCORRECT");
    }
  }
}
