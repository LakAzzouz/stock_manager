import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { CreateUser } from "../../usecases/User/CreateUser";
import { MockPasswordGateway } from "../../adapters/gateways/MockPasswordGateway";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - Create user", () => {
  let createUser: CreateUser;
  const userDb = new Map<string, User>();
  const email = "toto@gmail.com";
  const password = "Toto1234!";
  const username = "toto";

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    const passwordGateway = new MockPasswordGateway();
    createUser = new CreateUser(userRepository, passwordGateway);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should create a user", async () => {
    const result = await createUser.execute({
      email,
      password,
      username,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.email).toEqual(email);
    expect(result.props.password).toEqual(password);
    expect(result.props.username).toEqual(username);
    expect(result.props.createdAt).toBeDefined();
  });

  it("Should throw an error because the password is invalid", async () => {
    const result = createUser.execute({
      username,
      email,
      password: "azerty",
    });

    await expect(result).rejects.toThrow(UserErrors.InvalidPassword);
  });

  it("Should save a user", async () => {
    const user = await createUser.execute({
      email,
      password,
      username,
    });

    expect(userDb.get(user.props.id)).toEqual(user);
  });

  it("Should throw an error because the mail already exist", async () => {
    const user = DataBuilders.generateUser({
      email,
    });

    userDb.set(user.props.id, user);

    const result = createUser.execute({
      username,
      email,
      password,
    });

    await expect(result).rejects.toThrow(UserErrors.AlreadyExist);
  });
});
