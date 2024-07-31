import { Stock } from "../../entities/Stock";
import { StockRepository } from "../../repositories/StockRepository";
import { Location } from "../../types/LocationType";
import { InitiateStock } from "../../usecases/Stock/InitiateStock";
import { InMemoryStockRepository } from "../../adapters/repositories/InMemoryStockRepository";
import { StockData } from "../../entities/StockData";

describe("Unit - initiate stock", () => {
  let stockRepository: StockRepository;
  let initiateStock: InitiateStock;
  const stockDb = new Map<string, Stock>();
  const type = Location.STORE;
  const locationId = "location_id";
  const stockDatas = new StockData({
    id: "id",
    stockId: "stock_id",
    productId: "product_id",
    quantity: 0
  });

  beforeAll(async () => {
    stockRepository = new InMemoryStockRepository(stockDb);
    initiateStock = new InitiateStock(stockRepository);
  });

  afterEach(async () => {
    stockDb.clear();
  });

  it("Should initiate stock", async () => {
    const result = await initiateStock.execute({
      type,
      locationId,
      stockDatas: [stockDatas]
    });

    expect(result.props.type).toEqual(type);
    expect(result.props.locationId).toEqual(locationId);
    expect(result.props.stockDatas).toEqual([stockDatas]);
    expect(result.props.id).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });
});
