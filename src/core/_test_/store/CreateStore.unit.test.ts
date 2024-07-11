import { Store } from "../../entities/Store";
import { StoreRepository } from "../../repositories/StoreRepository";
import { CreateStore } from "../../usecases/Store/CreateStore";
import { InMemoryStoreRepository } from "../../adapters/repositories/InMemoryStoreRepository";

describe("Unit - Create store", () => {
  let storeRepository: StoreRepository;
  let createStore: CreateStore;
  const storeDb = new Map<string, Store>();
  const storeName = "Nike store";
  const city = "Paris";
  const turnover = 3000;
  const priceReduction = 0;
  const frequentation = 10000;

  beforeAll(async () => {
    storeRepository = new InMemoryStoreRepository(storeDb);
    createStore = new CreateStore(storeRepository);
  });

  afterEach(async () => {
    storeDb.clear();
  });

  it("Should create a store", async () => {
    const result = await createStore.execute({
      name: storeName,
      city,
      turnover,
      frequentation,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.name).toEqual(storeName);
    expect(result.props.city).toEqual(city);
    expect(result.props.frequentation).toEqual(frequentation);
    expect(result.props.turnover).toEqual(turnover);
    expect(result.props.priceReduction).toEqual(priceReduction);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });

  it("Should apply price reduction - 10% when the frequentation < 5000/month", async () => {
    const store = await createStore.execute({
      city,
      name: storeName,
      turnover,
      frequentation: 3000,
    });

    expect(store.props.priceReduction).toEqual(10);
  });

  it("Should apply price reduction - 5% when the frequentation < 10000/month", async () => {
    const store = await createStore.execute({
      city,
      name: storeName,
      turnover,
      frequentation: 9000,
    });

    expect(store.props.priceReduction).toEqual(5);
  });

  it("Should save store", async () => {
    const store = await createStore.execute({
      city,
      name: storeName,
      turnover,
      frequentation: 10000,
    });

    expect(storeDb.get(store.props.id)).toEqual(store);
  });
});
