import { BCryptGateway } from "../../gateways/BcryptGateway";

describe("Bcrypt - Integ", () => {
  let bcrypt: BCryptGateway;
  const password = "password";

  beforeAll(async () => {
    bcrypt = new BCryptGateway();
  });

  it("Should hash password", async () => {
    const passwordHash = await bcrypt.hashPassword(password);

    expect(passwordHash).toBeDefined();
    expect(passwordHash === password).toBeFalsy();
  });

  it("Should compare password", async () => {
    const passwordHash = await bcrypt.hashPassword(password);

    const compare = await bcrypt.compare(password, passwordHash);

    expect(compare).toBeTruthy();
  });
});
