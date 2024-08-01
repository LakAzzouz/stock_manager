import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { StockData } from "../../../core/entities/StockData";
import { SqlStockRepository } from "../../repositories/SQL/SqlStockRepository";
import { SqlStockMapper } from "../../repositories/mappers/SqlStockMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Stock Repository", () => {
  let sqlStockMapper: SqlStockMapper;
  let sqlStockRepository: SqlStockRepository;
  const stock = DataBuilders.generateStock({
    id: "stock_id",
    stockDatas: [
      new StockData ({
        stockId: "stock_id",
        id: "id",
        productId: "product_id",
        quantity: 10,
      })
    ]
  });
  const stock2 = DataBuilders.generateStock({
    id: "stock_id2",
  });

  beforeAll(async () => {
    sqlStockMapper = new SqlStockMapper();
    sqlStockRepository = new SqlStockRepository(dbTest, sqlStockMapper);
  });

  beforeEach(async () => {
    // await dbTest.raw(`TRUNCATE TABLE stocks`);
    // await dbTest.raw(`TRUNCATE TABLE stock_datas`);
  });

  it("Should save stock and get it by id", async () => {
    await sqlStockRepository.save(stock);

    const result = await sqlStockRepository.getById(stock.props.id);

    expect(result.props).toEqual(stock.props);
  });

  // it("Should get stocks by ids", async () => {
  //   await sqlStockRepository.save(stock);
  //   await sqlStockRepository.save(stock2);
    
  //   const result = await sqlStockRepository.getAllIds();
    
  //   console.log(stock)
  //   console.log(stock2)
  //   console.log(result)
    
  //   expect(result).toHaveLength(2);
  //   expect(result).toEqual([stock.props.id, stock2.props.id]);
  // });

  // it("Should delete stock", async () => {
  //   await sqlStockRepository.save(stock);
  
  //   const result = await sqlStockRepository.delete(stock.props.id);
  
  //   expect(result).toBeUndefined();
  // });
});
