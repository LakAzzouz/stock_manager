import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlMediaRepository } from "../../repositories/SQL/SqlMediaRepository";
import { SqlMediaMapper } from "../../repositories/mappers/SqlMediaMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Media Repository", () => {
  let sqlMediaMapper: SqlMediaMapper;
  let sqlMediaRepository: SqlMediaRepository;
  const media = DataBuilders.generateMedia();

  beforeAll(async () => {
    (sqlMediaMapper = new SqlMediaMapper()),
      (sqlMediaRepository = new SqlMediaRepository(dbTest, sqlMediaMapper));
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE medias`);
  });

  it("Should save media and get it by id", async () => {
    await sqlMediaRepository.save(media);

    const result = await sqlMediaRepository.getById(media.props.id);

    expect(result?.props).toEqual(media.props);
  });

  it("Should delete media", async () => {
    await sqlMediaRepository.save(media);

    const result = await sqlMediaRepository.delete(media.props.id);

    expect(result).toBeUndefined()
  })
});
