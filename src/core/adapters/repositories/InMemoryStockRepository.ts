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
      return null;
    }
    return stock;
  }

  async getAllIds(): Promise<string[] | null> {
    const stocks = Array.from(this.map.values());
    const stockIds = stocks.map((elm) => elm.props.id);
    if (!stockIds.length) {
      return null;
    }
    return stockIds;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
