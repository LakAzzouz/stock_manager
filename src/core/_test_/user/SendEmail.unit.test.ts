import { MockEmailGateway } from "../../adapters/gateways/MockEmailGateway";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { User } from "../../entities/User";
import { UserErrors } from "../../errors/UserErrors";
import { SendEmail } from "../../usecases/User/SendEmail";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - Send email", () => {
  let sendEmail: SendEmail;
  const userDb = new Map<string, User>();
  const email = "toto@gmail.com";
  const username = "toto";
  const verifyEmailCode = "1234"
  const user = DataBuilders.generateUser({
    email,
    username,
    verifyEmailCode
  });
  
  beforeAll(async () => {
    const emailGateway = new MockEmailGateway();
    const userRepository = new InMemoryUserRepository(userDb);
    sendEmail = new SendEmail(userRepository, emailGateway);
  });

  afterEach(async () => {
    userDb.clear();
  });

  it("Should send an email", async () => {
    userDb.set(user.props.id, user);

    const result = await sendEmail.execute({
      email,
      id: user.props.id,
      username,
    });

    expect(result).toBeFalsy();
  });

  it("Should throw an error because user is not found", async () => {
    const result = sendEmail.execute({
      email,
      id: user.props.id,
      username,
    });

    await expect(result).rejects.toThrow(UserErrors.UserNotFound);
  });

  it("Shoulw throw an error because email format is incorrect", async () => {
    userDb.set(user.props.id, user);

    const result = sendEmail.execute({
      email: "toto.com",
      id: user.props.id,
      username,
    });

    await expect(result).rejects.toThrow(UserErrors.EmailFormat);
  });
});
