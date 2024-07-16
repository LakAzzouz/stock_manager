import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";
import { DeleteUser } from "../../usecases/User/DeleteUser";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - delete user", () => {
  let userRepository: UserRepository;
  let deleteUser: DeleteUser;
  const userDb = new Map<string, User>();
  const user = DataBuilders.generateUser({});

  beforeAll(async () => {
    userRepository = new InMemoryUserRepository(userDb);
    deleteUser = new DeleteUser(userRepository);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should delete user", async () => {
    userDb.set(user.props.id, user);

    const result = await deleteUser.execute({
      id: user.props.id,
    });

    userDb.get(user.props.id);

    expect(result).toBeUndefined();
  });
});
