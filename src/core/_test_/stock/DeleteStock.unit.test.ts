import { Stock } from "../../entities/Stock";
import { StockErrors } from "../../errors/StockErrors";
import { StockRepository } from "../../repositories/StockRepository";
import { DeleteStock } from "../../usecases/Stock/DeleteStock";
import { InMemoryStockRepository } from "../../adapters/repositories/InMemoryStockRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - delete stock", () => {
  let stockRepository: StockRepository;
  let deleteStock: DeleteStock;
  const stockDb = new Map<string, Stock>();

  beforeAll(async () => {
    stockRepository = new InMemoryStockRepository(stockDb);
    deleteStock = new DeleteStock(stockRepository);
  });

  afterEach(async () => {
    stockDb.clear();
  });

  it("Should delete stock", async () => {
    const stock = DataBuilders.generateStock({});

    stockDb.set(stock.props.id, stock);

    const result = await deleteStock.execute({
      id: stock.props.id,
    });

    stockDb.get(stock.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because the stock is not found", async () => {
    const stock = DataBuilders.generateStock({});

    stockDb.set(stock.props.id, stock);

    const result = deleteStock.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(StockErrors.NotFound);
  });
});
