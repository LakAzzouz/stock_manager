import { Knex } from "knex";
import { SqlUserMapper } from "../mappers/SqlUserMapper";
import { User } from "../../../core/entities/User";
import { UserRepository } from "../../../core/repositories/UserRepository";

export class SqlUserRepository implements UserRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _userMapper: SqlUserMapper
  ) {}

  async save(user: User): Promise<void> {
    const userModel = this._userMapper.fromDomain(user);
    await this._knex.raw(
      `INSERT INTO users (id, username, email, password, birth_date, is_verified, reset_password_code, verify_email_code, created_at, updated_at)
      VALUES (:id, :username, :email, :password, :birth_date, :is_verified, :reset_password_code, :verify_email_code, :created_at, :updated_at)`,
      {
        id: userModel.id,
        username: userModel.username,
        email: userModel.email,
        password: userModel.password,
        birth_date: userModel.birth_date,
        is_verified: userModel.is_verified,
        reset_password_code: userModel.reset_password_code,
        verify_email_code: userModel.verify_email_code,
        created_at: userModel.created_at,
        updated_at: userModel.updated_at || new Date()
      }
    );
  }

  async getById(id: string): Promise<User | null> {
    const userModel = await this._knex.raw(
      `SELECT *
      FROM users
      WHERE id = :id`,
      {
        id: id,
      }
    );

    const user = this._userMapper.toDomain(userModel[0][0]);

    return user;
  }

  async getByEmail(email: string): Promise<User | null> {
    const userModel = await this._knex.raw(
      `SELECT *
      FROM users
      WHERE email = :email`,
      {
        email: email,
      }
    );

    if(!userModel[0][0]) {
      return null
    }

    const user = this._userMapper.toDomain(userModel[0][0]);

    return user;
  }

  async update(user: User): Promise<User> {
    const userModel = this._userMapper.fromDomain(user);

    await this._knex.raw(
    `UPDATE users SET
    username = COALESCE(:username, username),
    password = COALESCE(:password, password),
    birth_date = COALESCE(:birth_date, birth_date),
    is_verified = COALESCE(:is_verified, is_verified)
    WHERE id = :id`,
      {
        id: userModel.id,
        username: userModel.username,
        password: userModel.password,
        birth_date: userModel.birth_date,
        is_verified: userModel.is_verified,
      }
    );

    return user;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(
      `DELETE FROM users
      WHERE id = :id`,
    {
      id: id,
    });
  }
}
