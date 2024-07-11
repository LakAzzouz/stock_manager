import { StockDataRepository } from "../../repositories/StockDataRepository";
import { StockData } from "../../types/StockData";

export class InMemoryStockDataRepository implements StockDataRepository {
  map: Map<string, StockData>;

  constructor(map: Map<string, StockData>) {
    this.map = map;
  }

  async saveAll(stockDatas: StockData[]): Promise<void> {
    for (const stockData of stockDatas) {
      this.map.set(stockData.stockId, stockData);
    }
    return;
  }
}
