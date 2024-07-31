import { StockData } from "../../entities/StockData";
import { StockDataRepository } from "../../repositories/StockDataRepository";

export class InMemoryStockDataRepository implements StockDataRepository {
  map: Map<string, StockData>;

  constructor(map: Map<string, StockData>) {
    this.map = map;
  }

  async saveAll(stockDatas: StockData[]): Promise<void> {
    for (const stockData of stockDatas) {
      this.map.set(stockData.props.stockId, stockData);
    }
    return;
  }
}
