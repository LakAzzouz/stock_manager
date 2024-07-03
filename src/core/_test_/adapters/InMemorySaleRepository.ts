import { Sale } from "../../entities/Sale";
import { SaleErrors } from "../../errors/SaleErrors";
import { SaleRepository } from "../../repositories/SaleRepository";

export class InMemorySaleRepository implements SaleRepository {
  map: Map<string, Sale>;

  constructor(map: Map<string, Sale>) {
    this.map = map;
  }

  async save(sale: Sale): Promise<void> {
    this.map.set(sale.props.id, sale);
  }

  async getById(id: string): Promise<Sale> {
    const sale = this.map.get(id);
    if (!sale) {
      throw new SaleErrors.NotFound();
    }
    return sale;
  }

  async delete(id: string): Promise<void> {
    const isSaleDeleted = this.map.delete(id);
    if (!isSaleDeleted) {
      throw new SaleErrors.NotFound();
    }
  }
}
