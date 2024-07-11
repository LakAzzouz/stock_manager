import { Store } from "../../entities/Store";
import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories/StoreRepository";
import { GetStoreByCity } from "../../usecases/Store/GetStoreByCity";
import { InMemoryStoreRepository } from "../../adapters/repositories/InMemoryStoreRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get store by city", () => {
  let storeRepository: StoreRepository;
  let getStoreByCity: GetStoreByCity;
  const storeDb = new Map<string, Store>();

  beforeAll(async () => {
    storeRepository = new InMemoryStoreRepository(storeDb);
    getStoreByCity = new GetStoreByCity(storeRepository);
  });

  afterEach(async () => {
    storeDb.clear();
  });

  it("Should get store by city", async () => {
    const store = DataBuilders.generateStore({});

    storeDb.set(store.props.city, store);

    const result = await getStoreByCity.execute({
      city: store.props.city,
    });

    expect(result.props.city).toEqual(store.props.city);
  });

  it("Should throw an error because the store is not found", async () => {
    const store = DataBuilders.generateStore({});

    storeDb.set(store.props.city, store);

    const result = getStoreByCity.execute({
      city: "wrong_city",
    });

    await expect(result).rejects.toThrow(StoreErrors.NotFound);
  });
});
