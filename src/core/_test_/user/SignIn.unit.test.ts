import { User } from "../../entities/User";
import { SignIn } from "../../usecases/User/SignIn";
import { MockPasswordGateway } from "../../adapters/gateways/MockPasswordGateway";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { DataBuilders } from "../tools/DataBuilders";
import { UserErrors } from "../../errors/UserErrors";
import { PasswordErrors } from "../../errors/PasswordErrors";

describe("Unit - sign in", () => {
  let signIn: SignIn;
  const userDb = new Map<string, User>();
  const email = "toto@gmail.com";
  const password = "Toto1234!";

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    const passwordGateway = new MockPasswordGateway();
    signIn = new SignIn(userRepository, passwordGateway);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should sign in", async () => {
    const user = DataBuilders.generateUser({
      email,
      password,
      isVerified: true,
    });

    userDb.set(user.props.id, user);

    const result = await signIn.execute({
      email,
      password,
    });

    expect(result.props.email).toEqual(email);
    expect(result.props.password).toEqual(password);
  });

  it("Should throw an error because user not found", async () => {
    const result = signIn.execute({
      email,
      password,
    });

    await expect(result).rejects.toThrow(UserErrors.EmailNotFound);
  });

  it("Should throw an error because the email is not verified", async () => {
    const user = DataBuilders.generateUser({
      email,
      password,
    });

    userDb.set(user.props.id, user);

    const result = signIn.execute({
      email,
      password,
    });

    expect(result).rejects.toThrow(UserErrors.NotVerified);
  });

  it("Should throw an error because the password is incorrect", async () => {
    const user = DataBuilders.generateUser({
      email,
      password,
      isVerified: true,
    });

    userDb.set(user.props.id, user);

    const result = signIn.execute({
      email,
      password: "wrong_password",
    });

    await expect(result).rejects.toThrow(PasswordErrors.PasswordIncorrect);
  });
});
