import { Stock } from "../../entities/Stock";
import { StockErrors } from "../../errors/StockErrors";
import { StockRepository } from "../../repositories/StockRepository";
import { Location, StockData, Threshold } from "../../types/StockData";
import { InitiateStock } from "../../usecases/Stock/InitiateStock";
import { InMemoryStockRepository } from "../adapters/InMemoryStockRepository";
import { DataBuilders } from "../tools/DataBuilders";

const stockDb = new Map<string, Stock>();

describe("Unit - initiate stock", () => {
  let stockRepository: StockRepository;
  let initiateStock: InitiateStock;
  let stockByLocation: StockData[];
  const productId = "product_id";

  beforeAll(async () => {
    stockRepository = new InMemoryStockRepository(stockDb);
    initiateStock = new InitiateStock(stockRepository);
    stockByLocation = [
      {
        type: Location.STORE,
        locationId: "store_id",
        quantity: 50,
        threshold: Threshold.STORE,
      },
      {
        type: Location.WAREHOUSE,
        locationId: "warehouse_id",
        quantity: 100,
        threshold: Threshold.WAREHOUSE,
      },
    ];
  });

  afterEach(async () => {
    stockDb.clear();
  });

  it("Should initiate stock", async () => {
    const result = await initiateStock.execute({
      productId,
      stockByLocation,
    });

    expect(result.props.stockByLocation).toEqual(stockByLocation);
    expect(result.props.productId).toEqual(productId);
    expect(result.props.id).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });

  it("Should throw stock with stock already exist", async () => {
    const stock = DataBuilders.generateStock({
      id: productId
    });

    stockDb.set(stock.props.id, stock)

    const result = initiateStock.execute({
      productId: stock.props.productId,
      stockByLocation,
    });

    await expect(result).rejects.toThrow(StockErrors.AlReadyExists);
  });
});
