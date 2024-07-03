import { Stock } from "../../entities/Stock";
import { StockRepository } from "../../repositories/StockRepository";
import { InMemoryStockRepository } from "../adapters/InMemoryStockRepository";
import { Location, Threshold } from "../../types/StockData";
import { CreateStock } from "../../usecases/Stock/CreateStock";
import { StoreRepository } from "../../repositories/StoreRepository";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Store } from "../../entities/Store";
import { Warehouse } from "../../entities/Warehouse";
import { InMemoryStoreRepository } from "../adapters/InMemoryStoreRepository";
import { InMemoryWarehouseRepository } from "../adapters/InMemoryWarehouseRepository";
import { DataBuilders } from "../tools/DataBuilders";
import { StockErrors } from "../../errors/StockErrors";

describe("Unit - create stock", () => {
  let stockRepository: StockRepository;
  let storeRepository: StoreRepository;
  let warehouseRepository: WarehouseRepository;
  let createStock: CreateStock;
  const stockDb = new Map<string, Stock>();
  const storeDb = new Map<string, Store>();
  const warehouseDb = new Map<string, Warehouse>();
  const store = DataBuilders.generateStore({});
  const productId = "product_id";
  const locationId = "location_id";
  const quantity = 20;
  const stockByLocation = [
    {
      type: Location,
      locationId,
      quantity,
      threshold: Threshold,
    },
  ];

  beforeAll(async () => {
    stockRepository = new InMemoryStockRepository(stockDb);
    storeRepository = new InMemoryStoreRepository(storeDb);
    warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);
    createStock = new CreateStock(
      stockRepository,
      storeRepository,
      warehouseRepository
    );
  });

  afterEach(async () => {
    storeDb.clear();
    stockDb.clear();
    warehouseDb.clear();
  });

  it("Should create stock", async () => {
    storeDb.set(store.props.id, store);

    const result = await createStock.execute({
      productId,
    });

    const stockStored = stockDb.get(result.props.id)

    expect(result.props.id).toBeDefined();
    expect(result.props.productId).toEqual(productId);
    expect(result.props.stockByLocation).toHaveLength(1);
    expect(result.props.stockByLocation[0].type).toEqual(Location.STORE);
    expect(result.props.createdAt).toBeDefined();
    expect(stockStored).toBeTruthy()
  });

  it("Should not create stock without store and warehouse", async () => {
    const result = createStock.execute({
      productId,
    });

    await expect(result).rejects.toThrow(StockErrors.NeedStoreOrWarehouseId);
  });

  it("Should throw an error because already exist with the product", async () => {
    const stock = DataBuilders.generateStock({
      productId,
    });

    stockDb.set(stock.props.id, stock);

    const result = createStock.execute({
      productId,
    });

    await expect(result).rejects.toThrow(StockErrors.AlReadyExists);
  });
});
