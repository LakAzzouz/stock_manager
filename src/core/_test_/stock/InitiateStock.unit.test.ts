import { Stock } from "../../entities/Stock";
import { StockRepository } from "../../repositories/StockRepository";
import { Location } from "../../types/LocationType";
import { InitiateStock } from "../../usecases/Stock/InitiateStock";
import { InMemoryStockRepository } from "../../adapters/repositories/InMemoryStockRepository";

const stockDb = new Map<string, Stock>();

describe("Unit - initiate stock", () => {
  let stockRepository: StockRepository;
  let initiateStock: InitiateStock;
  const type = Location.STORE
  const locationId = "location_id"
  const stockDatas = [{
    productId: "product_id",
    quantity: 0,
    stockId: "stock_id"
  }]


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
      stockDatas
    });

    expect(result.props.type).toEqual(type);
    expect(result.props.locationId).toEqual(locationId);
    expect(result.props.stockDatas).toEqual(stockDatas);
    expect(result.props.id).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });
});
