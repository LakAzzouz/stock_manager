import { MockEmailGateway } from "../../adapters/gateways/MockEmailGateway";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { GenerateResetPasswordCode } from "../../usecases/User/GenerateResetPasswordCode";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - generate reset password code", () => {
  let generateResetPasswordCode: GenerateResetPasswordCode;
  const userDb = new Map<string, User>();
  const user = DataBuilders.generateUser({});
  const resetPasswordCode = "";

  beforeAll(async () => {
    const userRepository = new InMemoryUserRepository(userDb);
    const emailGateway = new MockEmailGateway();
    generateResetPasswordCode = new GenerateResetPasswordCode(userRepository, emailGateway);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should generate a reset password code", async () => {
    userDb.set(user.props.id, user);

    const result = await generateResetPasswordCode.execute({
      email: user.props.email,
      username: user.props.username,
      resetPasswordCode,
    });

    expect(result).toBeFalsy();
  });

  it("Should throw an error because user is not found", async () => {
    const result = generateResetPasswordCode.execute({
      email: user.props.email,
      username: user.props.username,
      resetPasswordCode,
    });

    await expect(result).rejects.toThrow(UserErrors.UserNotFound);
  });
});
