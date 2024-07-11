import { User } from "../../entities/User";
import { SignIn } from "../../usecases/User/SignIn";
import { MockPasswordGateway } from "../../adapters/gateways/MockPasswordGateway";
import { InMemoryUserRepository } from "../../adapters/repositories/InMemoryUserRepository";
import { DataBuilders } from "../tools/DataBuilders";

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
        password
    })

    userDb.set(user.props.id, user);

    const result = await signIn.execute({
      email,
      password,
    });

    expect(result.props.email).toEqual(email);
    expect(result.props.password).toEqual(password);
  });
});
