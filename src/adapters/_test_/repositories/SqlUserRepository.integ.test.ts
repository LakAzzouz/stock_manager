import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlUserRepository } from "../../repositories/SQL/SqlUserRepository";
import { SqlUserMapper } from "../../repositories/mappers/SqlUserMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql User repository", () => {
  let sqlUserMapper: SqlUserMapper;
  let sqlUserRepository: SqlUserRepository;
  const user = DataBuilders.generateUser({
    birthDate: new Date("July 14, 2024 23:15:30"),
  });

  beforeAll(async () => {
    sqlUserMapper = new SqlUserMapper();
    sqlUserRepository = new SqlUserRepository(dbTest, sqlUserMapper);
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE users`);
  });

  it("Should save user and get it by id", async () => {
    await sqlUserRepository.save(user);

    const result = await sqlUserRepository.getById(user.props.id);

    expect(result?.props).toEqual(user.props);
  });

  it("Should get user by email", async () => {
    await sqlUserRepository.save(user);

    const result = await sqlUserRepository.getByEmail(user.props.email);

    expect(result?.props).toEqual(user.props);
  });

  it("Should update user", async () => {
    await sqlUserRepository.save(user);

    const result = await sqlUserRepository.update(user);

    expect(result.props).toEqual(user.props);
  });

  it("Should delete user", async () => {
    await sqlUserRepository.save(user);

    const result = await sqlUserRepository.delete(user.props.id);

    expect(result).toBeUndefined();
  });
});
