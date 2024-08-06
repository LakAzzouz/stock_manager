import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { StockData } from "../../../core/entities/StockData";
import { StockErrors } from "../../../core/errors/StockErrors";
import { SqlStockRepository } from "../../repositories/SQL/SqlStockRepository";
import { SqlStockMapper } from "../../repositories/mappers/SqlStockMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Stock Repository", () => {
  let sqlStockMapper: SqlStockMapper;
  let sqlStockRepository: SqlStockRepository;
  const stock = DataBuilders.generateStock({
    id: "stock_id",
    stockDatas: [
      new StockData({
        id: "id",
        productId: "product_id",
        stockId: "stock_id",
        quantity: 100,
        threshold: 10,
      }),
    ],
  });

  const stock2 = DataBuilders.generateStock({
    id: "stock_id2",
  });

  beforeAll(async () => {
    sqlStockMapper = new SqlStockMapper();
    sqlStockRepository = new SqlStockRepository(dbTest, sqlStockMapper);
  });

  afterEach(async () => {
    // await dbTest.raw(`TRUNCATE TABLE stocks`);
    await dbTest.raw(`TRUNCATE TABLE stock_datas`);
  });

  it("Should save stock and get it by id", async () => {
    await sqlStockRepository.save(stock);

    const result = await sqlStockRepository.getById(stock.props.id);

    expect(result).toEqual(stock);
  });

  it("Should get all stock ids", async () => {
    await sqlStockRepository.save(stock);
    await sqlStockRepository.save(stock2);

    const result = await sqlStockRepository.getAllIds();

    expect(result).toHaveLength(2);
    expect(result).toEqual([stock.props.id, stock2.props.id]);
  });

  it("Should delete stock", async () => {
    await sqlStockRepository.save(stock);

    await sqlStockRepository.delete(stock.props.id);

    const result = sqlStockRepository.getById(stock.props.id);

    await expect(result).rejects.toThrow(StockErrors.NotFound);
  });
});
