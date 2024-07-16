import { GetAllStoreByIds } from "../../usecases/Store/GetAllStoreByIds";
import { InMemoryStoreRepository } from "../../adapters/repositories/InMemoryStoreRepository";
import { StoreRepository } from "../../repositories/StoreRepository";
import { Store } from "../../entities/Store";
import { DataBuilders } from "../tools/DataBuilders";
import { StoreErrors } from "../../errors/StoreErrors";

describe("Unit - get all store by ids", () => {
  let storeRepository: StoreRepository;
  let getAllStoreByIds: GetAllStoreByIds;
  const storeDb = new Map<string, Store>();
  const store1 = DataBuilders.generateStore({});
  const store2 = DataBuilders.generateStore({});
  const ids = [store1.props.id, store2.props.id];

  beforeAll(async () => {
    storeRepository = new InMemoryStoreRepository(storeDb);
    getAllStoreByIds = new GetAllStoreByIds(storeRepository);
  });

  afterEach(async () => {
    storeDb.clear();
  });

  it("Should return all store ids", async () => {
    storeDb.set(store1.props.id, store1);
    storeDb.set(store2.props.id, store2);

    const result = await getAllStoreByIds.execute({
      ids,
    });

    expect(result).toHaveLength(2);
  });

  it("Should throw an error because stores is not found", async () => {
    const result = getAllStoreByIds.execute({
      ids,
    });

    await expect(result).rejects.toThrow(StoreErrors.NotFound);
  });
});
