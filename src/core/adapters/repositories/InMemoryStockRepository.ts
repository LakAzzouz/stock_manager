import { Stock } from "../../entities/Stock";
import { StockErrors } from "../../errors/StockErrors";
import { StockRepository } from "../../repositories/StockRepository";
import { StockData } from "../../types/StockData";

export class InMemoryStockRepository implements StockRepository {
  map: Map<string, Stock>;

  constructor(map: Map<string, Stock>) {
    this.map = map;
  }
  
  async save(stock: Stock): Promise<void> {
    this.map.set(stock.props.id, stock);
  }

  async getById(id: string): Promise<Stock | null> {
    const stock = this.map.get(id);
    if (!stock) {
      throw new StockErrors.NotFound();
    }
    return stock;
  }

  async ensureThatDoesNotExistByProductId(productId: string): Promise<void> {
    const stocks = Array.from(this.map.values());
    const stockExists = stocks.some((stock) =>
      stock.props.stockDatas.some(
        (stockData) => stockData.productId === productId
      )
    );
    if (stockExists) {
      throw new StockErrors.AlReadyExists();
    }
  }

  async addStockDataToAllLocations(stockData: StockData): Promise<void> {
    const stocks = Array.from(this.map.values());
    for (const stock of stocks) {
      stock.props.stockDatas.push(stockData);
      this.map.set(stock.props.id, stock);
    }
    return;
  }

  async getAllIds(): Promise<string[] | null> {
    const stocks = Array.from(this.map.values());
    const stockIds = stocks.map((elm) => elm.props.id);
    return stockIds
  }

  async delete(id: string): Promise<void> {
    const isStockDeleted = this.map.delete(id);
    if (!isStockDeleted) {
      throw new StockErrors.NotFound();
    }
  }
}
