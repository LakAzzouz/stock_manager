import { StockData } from "../entities/StockData";

export interface StockDataRepository {
  saveAll(stockDatas: StockData[]): Promise<void>;
}
