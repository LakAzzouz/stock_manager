import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlStoreRepository } from "../../repositories/SQL/SqlStoreRepository";
import { SqlStoreMapper } from "../../repositories/mappers/SqlStoreMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Warehouse Repository", () => {
  let sqlStoreMapper: SqlStoreMapper;
  let sqlStoreRepository: SqlStoreRepository;
  const store = DataBuilders.generateStore({});

  beforeAll(async () => {
    sqlStoreMapper = new SqlStoreMapper();
    sqlStoreRepository = new SqlStoreRepository(dbTest, sqlStoreMapper);
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE stores`);
  });

  it("Should save store and get it by id", async () => {
    await sqlStoreRepository.save(store);

    const result = await sqlStoreRepository.getById(store.props.id);

    expect(result.props).toEqual(store.props);
  });

  it("Should get store by city", async () => {
    await sqlStoreRepository.save(store);

    const result = await sqlStoreRepository.getByCity(store.props.city);

    expect(result.props).toEqual(store.props);
  });

  it("Should delete store by id", async () => {
    await sqlStoreRepository.save(store);

    const result = await sqlStoreRepository.delete(store.props.id);

    expect(result).toBeUndefined();
  });
});
