import { Sale } from "../entities/Sale";

export interface SaleRepository {
  save(sale: Sale): Promise<void>;

  getById(id: string): Promise<Sale>;

  delete(id: string): Promise<void>
}
