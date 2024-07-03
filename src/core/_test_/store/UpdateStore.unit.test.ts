import { Store } from "../../entities/Store";
import { StoreRepository } from "../../repositories/StoreRepository";
import { UpdateStore } from "../../usecases/Store/UpdateStore";
import { InMemoryStoreRepository } from "../adapters/InMemoryStoreRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - update store", () => {
  let storeRepository: StoreRepository;
  let updateStore: UpdateStore;
  const storeDb = new Map<string, Store>();
  const newPriceReduction = 10

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
        newPriceReduction: newPriceReduction
    })

    expect(result.props.priceReduction).toEqual(newPriceReduction)
  });
});
