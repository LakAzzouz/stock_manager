import { Store } from "../../entities/Store";
import { StoreRepository } from "../../repositories/StoreRepository";
import { UpdateStore } from "../../usecases/Store/UpdateStore";
import { InMemoryStoreRepository } from "../../adapters/repositories/InMemoryStoreRepository";
import { DataBuilders } from "../tools/DataBuilders";
import { StoreErrors } from "../../errors/StoreErrors";

describe("Unit - update store", () => {
  let storeRepository: StoreRepository;
  let updateStore: UpdateStore;
  const storeDb = new Map<string, Store>();
  const newPriceReduction = 10;
  const id = "id";

  beforeAll(async () => {
    storeRepository = new InMemoryStoreRepository(storeDb);
    updateStore = new UpdateStore(storeRepository);
  });

  afterEach(async () => {
    storeDb.clear();
  });

  it("Should return a store updated", async () => {
    const store = DataBuilders.generateStore({});

    storeDb.set(store.props.id, store);

    const result = await updateStore.execute({
      id: store.props.id,
      newPriceReduction: newPriceReduction,
    });

    expect(result.props.priceReduction).toEqual(newPriceReduction);
  });

  it("Should return an error because the store is not found", async () => {
    const result = updateStore.execute({
      id,
      newPriceReduction,
    });

    await expect(result).rejects.toThrow(StoreErrors.NotFound)
  });
});
