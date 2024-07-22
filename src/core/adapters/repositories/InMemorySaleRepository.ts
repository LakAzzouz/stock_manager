import { Sale } from "../../entities/Sale";
import { SaleRepository } from "../../repositories/SaleRepository";

export class InMemorySaleRepository implements SaleRepository {
  map: Map<string, Sale>;

  constructor(map: Map<string, Sale>) {
    this.map = map;
  }

  async save(sale: Sale): Promise<void> {
    this.map.set(sale.props.id, sale);
  }

  async getById(id: string): Promise<Sale | null> {
    const sale = this.map.get(id);
    if (!sale) {
      return null;
    }
    return sale;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
