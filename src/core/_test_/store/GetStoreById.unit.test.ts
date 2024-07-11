import { Store } from "../../entities/Store";
import { StoreErrors } from "../../errors/StoreErrors";
import { StoreRepository } from "../../repositories/StoreRepository";
import { GetStoreById } from "../../usecases/Store/GetStoreById";
import { InMemoryStoreRepository } from "../../adapters/repositories/InMemoryStoreRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get store by id", () => {
  let storeRepository: StoreRepository;
  let getStoreById: GetStoreById;
  const storeDb = new Map<string, Store>();
  const id = "id";
  const name = "Nike store";
  const city = "Paris";
  const turnover = 100000;
  const frequentation = 10000;
  const priceReduction = 0;

  beforeAll(async () => {
    storeRepository = new InMemoryStoreRepository(storeDb);
    getStoreById = new GetStoreById(storeRepository);
  });

  afterEach(async () => {
    storeDb.clear();
  });

  it("Should get a store by id", async () => {
    const store = DataBuilders.generateStore({
      id,
      name,
      city,
      turnover,
      frequentation,
      priceReduction,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    storeDb.set(store.props.id, store);

    const result = await getStoreById.execute({
      id: store.props.id,
    });

    expect(result.props.id).toEqual(store.props.id);
  });

  it("Should throw an error because the id is not found", async () => {
    const store = DataBuilders.generateStore({});

    storeDb.set(store.props.id, store);

    const result = getStoreById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(StoreErrors.NotFound);
  });
});
