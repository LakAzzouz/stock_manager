import { Stock } from "../entities/Stock";

export interface StockRepository {
  save(stock: Stock): Promise<void>;

  getById(id: string): Promise<Stock>;

  ensureThatDoesNotExistByProductId(productId: string): Promise<void>;

  delete(id: string): Promise<void>;
}
