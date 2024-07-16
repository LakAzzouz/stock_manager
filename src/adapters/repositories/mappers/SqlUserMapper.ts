import { User } from "../../../core/entities/User";
import { UserModel } from "../models/UserModel";
import { Mapper } from "./Mapper";

export class SqlUserMapper implements Mapper<UserModel, User> {
  toDomain(raw: UserModel): User {
    const user = new User({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      username: raw.username,
      birthDate: raw.birth_date,
      verifyEmailCode: raw.verify_email_code,
      isVerified: raw.is_verified ? true : false,
      resetPasswordCode: raw.reset_password_code,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return user;
  }

  fromDomain(data: User): UserModel {
    const userModel: UserModel = {
      id: data.props.id,
      email: data.props.email,
      password: data.props.password,
      username: data.props.username,
      birth_date: data.props.birthDate,
      verify_email_code: data.props.verifyEmailCode,
      is_verified: data.props.isVerified,
      reset_password_code: data.props.resetPasswordCode,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return userModel;
  }
}
