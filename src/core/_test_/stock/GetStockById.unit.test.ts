import { Stock } from "../../entities/Stock";
import { StockErrors } from "../../errors/StockErrors";
import { StockRepository } from "../../repositories/StockRepository";
import { GetStockById } from "../../usecases/Stock/GetStockById";
import { InMemoryStockRepository } from "../../adapters/repositories/InMemoryStockRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get stock by id", () => {
  let stockRepository: StockRepository;
  let getStockById: GetStockById;
  const stockDb = new Map<string, Stock>();

  beforeAll(async () => {
    stockRepository = new InMemoryStockRepository(stockDb);
    getStockById = new GetStockById(stockRepository);
  });

  afterEach(async () => {
    stockDb.clear();
  });

  it("Should get stock by id", async () => {
    const stock = DataBuilders.generateStock({});

    stockDb.set(stock.props.id, stock);

    const result = await getStockById.execute({
      id: stock.props.id,
    });

    expect(result).toEqual(stock);
  });

  it("Should throw an error because stock is not found", async () => {
    const stock = DataBuilders.generateStock({});

    stockDb.set(stock.props.id, stock);

    const result = getStockById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(StockErrors.NotFound);
  });
});
