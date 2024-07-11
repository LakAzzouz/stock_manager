import { v4 } from "uuid";

export type UserProperties = {
  id: string;
  username: string;
  email: string;
  password: string;
  birthDate: Date;
  isVerified: boolean;
  resetPasswordCode: string;
  verifyEmailCode: string;
  createdAt: Date;
  updatedAt?: Date;
};

export class User {
  props: UserProperties;

  constructor(userProperties: UserProperties) {
    this.props = userProperties;
  }

  static create(props: {username: string, email: string, password: string, resetPasswordCode: string, verifyEmailCode: string;}): User {
    const user = new User({
      id: v4(),
      username: props.username,
      email: props.email,
      password: props.password,
      birthDate: new Date(1997, 5, 23),
      isVerified: false,
      resetPasswordCode: props.resetPasswordCode,
      verifyEmailCode: props.verifyEmailCode,
      createdAt: new Date(),
    });
    return user;
  }
}
