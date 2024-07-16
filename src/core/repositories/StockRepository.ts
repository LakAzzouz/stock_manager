import { Stock } from "../entities/Stock";

export interface StockRepository {  
  save(stock: Stock): Promise<void>;

  getById(id: string): Promise<Stock | null>;

  getAllIds(): Promise<string[] | null>;

  delete(id: string): Promise<void>;
}
