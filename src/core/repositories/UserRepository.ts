import { User } from "../entities/User";

export interface UserRepository {
  save(user: User): Promise<void>;

  getById(id: string): Promise<User | null>;

  getByEmail(email: string): Promise<User | null>;

  update(user: User): Promise<User>;

  delete(id: string): Promise<void>;
}
