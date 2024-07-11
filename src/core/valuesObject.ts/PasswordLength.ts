import { UserErrors } from "../errors/UserErrors";

const re =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export class Password {
  static validate(password: string): string {
    if (!re.test(password)) {
      throw new UserErrors.InvalidPassword();
    }
    return password;
  }
}

//2eme méthode

// export class Password {
//   value: string;

//   constructor(password: string) {
//     this.value = this.isValid(password);
//   }

//   isValid(password: string): string {
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     const isPasswordValid = passwordRegex.test(password);
//     if(!isPasswordValid) {
//       throw new UserErrors.InvalidPassword();
//     }
//     return password;
//   }
// }
