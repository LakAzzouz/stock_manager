import { v4 } from "uuid";

export type UserProperties = {
  id: string;
  username: string;
  email: string;
  password: string;
  birthDate: Date;
  isVerified: boolean;
  resetPasswordCode?: string;
  verifyEmailCode?: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class User {
  props: UserProperties;

  constructor(userProperties: UserProperties) {
    this.props = userProperties;
  }

  static create(props: {username: string, email: string, password: string, resetPasswordCode: string}): User {
    const code = this.generateCode();
    const user = new User({
      id: v4(),
      username: props.username,
      email: props.email,
      password: props.password,
      birthDate: new Date(1997, 5, 23),
      isVerified: false,
      resetPasswordCode: props.resetPasswordCode,
      verifyEmailCode: code,
      createdAt: new Date(),
    });
    return user;
  }

  update(newResetPasswordCode: string): User {
    this.props.resetPasswordCode = newResetPasswordCode;
    return this;
  }

  static generateCode(): string{
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code
  }

  verifyEmail() {
    this.props.isVerified = true
  }
}
