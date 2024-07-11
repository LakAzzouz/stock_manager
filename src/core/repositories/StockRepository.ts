import { Stock } from "../entities/Stock";
import { StockData } from "../types/StockData";

export interface StockRepository {  
  save(stock: Stock): Promise<void>;

  getById(id: string): Promise<Stock | null>;

  ensureThatDoesNotExistByProductId(productId: string): Promise<void>;

  addStockDataToAllLocations(stockData: StockData): Promise<void>;

  getAllIds(): Promise<string[] | null>;

  delete(id: string): Promise<void>;
}
