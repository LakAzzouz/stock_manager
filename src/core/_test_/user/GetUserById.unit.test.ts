import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { UserRepository } from "../../repositories/UserRepository";
import { GetUserById } from "../../usecases/User/GetUserById";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get user by id", () => {
  let userRepository: UserRepository;
  let getUserById: GetUserById;
  const userDb = new Map<string, User>();
  const user = DataBuilders.generateUser({});

  beforeAll(async () => {
    userRepository = new InMemoryUserRepository(userDb);
    getUserById = new GetUserById(userRepository);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should get user by id", async () => {
    userDb.set(user.props.id, user);

    const result = await getUserById.execute({
      id: user.props.id,
    });

    expect(result).toEqual(user);
  });

  it("Should throw an error because user is not found", async () => {
    userDb.set(user.props.id, user);

    const result = getUserById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(UserErrors.UserNotFound);
  });
});
