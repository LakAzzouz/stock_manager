import { Stock } from "../../entities/Stock";
import { StockDataRepository } from "../../repositories/StockDataRepository";
import { StockRepository } from "../../repositories/StockRepository";
import { Location } from "../../types/LocationType";
import { StockData } from "../../types/StockData";
import { CreateStockData } from "../../usecases/Stock/CreateStockData";
import { InMemoryStockDataRepository } from "../../adapters/repositories/InMemoryStockDataRepository";
import { InMemoryStockRepository } from "../../adapters/repositories/InMemoryStockRepository";

describe("Unit Create stock data", () => {
    let stockDataRepository: StockDataRepository;
    let stockRepository: StockRepository;
    let createStockDatas: CreateStockData;
    const stockDataDb = new Map<string, StockData>();
    const stockDb = new Map<string, Stock>();
    let stock: Stock;
    let stock2: Stock;
    const productId = "product_id";
    
    beforeAll(async () => {
      stockDataRepository = new InMemoryStockDataRepository(stockDataDb);
      stockRepository = new InMemoryStockRepository(stockDb);
      createStockDatas = new CreateStockData(stockRepository, stockDataRepository);
      
      stock = new Stock({
        id: "id1",
        locationId: "location_id1",
        type: Location.STORE,
        stockDatas: [],
        createdAt: new Date()
      });
      
      stock2 = new Stock({
        id: "id2",
        locationId: "location_id2",
        type: Location.WAREHOUSE,
        stockDatas: [],
        createdAt: new Date()
      });
    });
    
    afterEach(async () => {
      stockDataDb.clear();
      stockDb.clear();
    });
    
    it("Should create stock data", async () => {
      stockDb.set(stock.props.id, stock);
      stockDb.set(stock2.props.id, stock2);

      const result = await createStockDatas.execute({
        productId
      });

      expect(result).toHaveLength(2)
    })
})
