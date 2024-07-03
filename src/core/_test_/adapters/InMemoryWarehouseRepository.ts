import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";

export class InMemoryWarehouseRepository implements WarehouseRepository {
  map: Map<string, Warehouse>;

  constructor(map: Map<string, Warehouse>) {
    this.map = map;
  }

  async save(warehouse: Warehouse): Promise<void> {
    this.map.set(warehouse.props.id, warehouse);
  }

  async getById(id: string): Promise<Warehouse> {
    const warehouse = this.map.get(id);
    if (!warehouse) {
      throw new WarehouseErrors.NotFound();
    }
    return warehouse;
  }

  async getByManagerId(managerId: string): Promise<Warehouse> {
    const warehouse = this.map.get(managerId);
    if (!warehouse) {
      throw new WarehouseErrors.NotFound();
    }
    return warehouse;
  }

  async getAllIds(): Promise<string[]> {
    const allWarehouses = Array.from(this.map.values())
    const allWarehousesIds = allWarehouses.map((elm) => elm.props.id)
    return allWarehousesIds
  }

  async delete(id: string): Promise<void> {
    const isWarehouseDeleted = this.map.delete(id);
    if (!isWarehouseDeleted) {
      throw new WarehouseErrors.NotFound();
    }
  }
}
