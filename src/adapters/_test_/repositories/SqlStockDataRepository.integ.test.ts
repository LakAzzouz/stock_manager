import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlStockDataRepository } from "../../repositories/SQL/SqlStockDataRepository";
import { SqlStockDataMapper } from "../../repositories/mappers/SqlStockDataMapper";
import { StockDataModel } from "../../repositories/models/StockDataModel";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql stock data", () => {
  let stockDataMapper: SqlStockDataMapper;
  let sqlStockDataRepository: SqlStockDataRepository;
  const stockData = DataBuilders.generateStockData({});

  beforeAll(async () => {
    stockDataMapper = new SqlStockDataMapper();
    sqlStockDataRepository = new SqlStockDataRepository(
      dbTest,
      stockDataMapper
    );
  });

  afterEach(async () => {
    //await dbTest.raw(`TRUNCATE TABLE stock_datas`)
  });

  it("Should save stock_datas", async () => {
    await sqlStockDataRepository.saveAll([stockData]);

    const result = await dbTest.raw(
      `SELECT * FROM stock_datas WHERE id = :id`,
      {
        id: stockData.props.id,
      }
    );

    expect(result).toBeDefined();
    expect(result[0][0].quantity).toEqual(stockData.props.quantity);
    expect(result[0][0].threshold).toEqual(stockData.props.threshold);
    expect(result[0][0].product_id).toEqual(stockData.props.productId);
    expect(result[0][0].stock_id).toEqual(stockData.props.stockId);
  });
});
