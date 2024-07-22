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

  async getById(id: string): Promise<Warehouse | null> {
    const warehouse = this.map.get(id);
    if (!warehouse) {
      return null;
    }
    return warehouse;
  }

  async getByManagerId(managerId: string): Promise<Warehouse | null> {
    const arr = Array.from(this.map.values());
    const warehouse = arr.find((elm) => elm.props.managerId === managerId);
    if (!warehouse) {
      return null;
    }
    return warehouse;
  }

  async getAllIds(): Promise<string[] | null> {
    const allWarehouses = Array.from(this.map.values());
    const allWarehousesIds = allWarehouses.map((elm) => elm.props.id);
    if (!allWarehousesIds.length) {
      return null;
    }
    return allWarehousesIds;
  }

  async delete(id: string): Promise<void> {
    this.map.delete(id);
    return;
  }
}
