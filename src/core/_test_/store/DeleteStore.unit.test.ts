import { Store } from "../../entities/Store";
import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories.ts/StoreRepository";
import { DeleteStore } from "../../usecases/Store/DeleteStore";
import { InMemoryStoreRepository } from "../adapters/repositories/InMemoryStoreRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - delete the store", () => {
  let storeRepository: StoreRepository;
  let deleteStore: DeleteStore;
  const storeDb = new Map<string, Store>();

  beforeAll(async () => {
    storeRepository = new InMemoryStoreRepository(storeDb);
    deleteStore = new DeleteStore(storeRepository);
  });

  afterEach(async () => {
    storeDb.clear();
  });

  it("Should delete a store", async () => {
    const store = DataBuilders.generateStore({});

    storeDb.set(store.props.id, store);

    await deleteStore.execute({
      id: store.props.id,
    });

    const result = storeDb.get(store.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because the store is not found by id", async () => {
    const store = DataBuilders.generateStore({});

    storeDb.set(store.props.id, store);

    const result = deleteStore.execute({
      id: "wrong_id"
    });

    await expect(result).rejects.toThrow(StoreErrors.NotFound)
  })
});
