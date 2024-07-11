import { StockData } from "../types/StockData";

export interface StockDataRepository {
  saveAll(stockDatas: StockData[]): Promise<void>;
}
