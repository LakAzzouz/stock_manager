import { Stock } from "../../entities/Stock";
import { StockRepository } from "../../repositories/StockRepository";
import { InMemoryStockRepository } from "../../adapters/repositories/InMemoryStockRepository";
import { CreateStockData } from "../../usecases/Stock/CreateStockData";
import { Location } from "../../types/LocationType";
import { StockDataRepository } from "../../repositories/StockDataRepository";
import { InMemoryStockDataRepository } from "../../adapters/repositories/InMemoryStockDataRepository";
import { StockErrors } from "../../errors/StockErrors";
import { StockData } from "../../entities/StockData";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - create stock", () => {
  let stockRepository: StockRepository;
  let stockDataRepository: StockDataRepository;
  let createStock: CreateStockData;
  const stockDb = new Map<string, Stock>();
  const stockDataDb = new Map<string, StockData>();
  const productId = "product_id";
  const stockStoreId = "stock_store_id";
  const stockWarehouseId = "stock_warehouse_id";
  let stock: Stock;
  let stock2: Stock;
  const stockDataStore = DataBuilders.generateStockData({
    productId,
    stockId: stockStoreId,
  })
  const stockDataWarehouse = DataBuilders.generateStockData({
    productId,
    stockId: stockWarehouseId
  })

  beforeAll(async () => {
    stockRepository = new InMemoryStockRepository(stockDb);
    stockDataRepository = new InMemoryStockDataRepository(stockDataDb);
    createStock = new CreateStockData(stockRepository, stockDataRepository);
    stock = new Stock({
      id: "id1",
      locationId: "location_id1",
      type: Location.STORE,
      stockDatas: [stockDataStore],
      createdAt: new Date(),
    });
    stock2 = new Stock({
      id: "id2",
      locationId: "location_id2",
      type: Location.WAREHOUSE,
      stockDatas: [stockDataWarehouse],
      createdAt: new Date(),
    });
  });

  afterEach(async () => {
    stockDb.clear();
  });

  it("Should create stock", async () => {
    stockDb.set(stock.props.id, stock);
    stockDb.set(stock2.props.id, stock2);

    await createStock.execute({
      productId,
    });

    const stockUpdated = stockDb.get(stock.props.id);
    const stockUpdated2 = stockDb.get(stock2.props.id);

    if (!stockUpdated || !stockUpdated2) {
      throw new StockErrors.NotFound();
    }

    expect(stockUpdated.props.stockDatas).toHaveLength(1);
    expect(stockUpdated2.props.stockDatas).toHaveLength(1);
  });

  it("Should return an error because the stock is not found", async () => {
    const result = createStock.execute({
      productId
    });

    await expect(result).rejects.toThrow(StockErrors.NotFound);
  })
});
