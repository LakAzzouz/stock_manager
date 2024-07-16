import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { VerifyEmail } from "../../usecases/User/VerifyEmail";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - verify email", () => {
  let verifyEmail: VerifyEmail;
  const userDb = new Map<string, User>();
  const email = "toto@gmail.com";
  const code = "12345";
  const user = DataBuilders.generateUser({
    email,
    verifyEmailCode: code,
  });

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    verifyEmail = new VerifyEmail(userRepository);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should verify email", async () => {
    userDb.set(user.props.id, user);

    const result = await verifyEmail.execute({
      email,
      code,
    });

    expect(result.props.email).toEqual(email);
  });

  it("Should throw an error because the code doest not match", async () => {
    userDb.set(user.props.id, user);

    const result = verifyEmail.execute({
      email,
      code: "6789",
    });

    await expect(result).rejects.toThrow(UserErrors.InvalidCode);
  });

  it("Should throw an error because the user is not found", async () => {
    const result = verifyEmail.execute({
      email,
      code,
    });

    await expect(result).rejects.toThrow(UserErrors.UserNotFound);
  });
});
