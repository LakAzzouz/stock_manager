import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { VerifyResetPasswordCode } from "../../usecases/User/VerifyResetPasswordCode";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - verify reset password code", () => {
  let verifyResetPasswordCode: VerifyResetPasswordCode;
  const userDb = new Map<string, User>();
  const email = "toto@gmail.com";
  const code = "12345";
  const password = "azerty";
  const user = DataBuilders.generateUser({
    email,
    resetPasswordCode: code,
    password,
  });

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    verifyResetPasswordCode = new VerifyResetPasswordCode(userRepository);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should verify reset password code", async () => {
    userDb.set(user.props.id, user);

    const result = await verifyResetPasswordCode.execute({
      email,
      code,
      password,
    });

    expect(result.props.email).toEqual(email);
  });

  it("Should throw an error because user is not found", async () => {
    const result = verifyResetPasswordCode.execute({
      email,
      code,
      password,
    });

    await expect(result).rejects.toThrow(UserErrors.UserNotFound);
  });
});
