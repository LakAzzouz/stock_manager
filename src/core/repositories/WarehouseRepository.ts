import { Warehouse } from "../entities/Warehouse";

export interface WarehouseRepository {
  save(warehouse: Warehouse): Promise<void>;

  getById(id: string): Promise<Warehouse>;

  getByManagerId(managerId: string): Promise<Warehouse>;

  getAllIds(): Promise<string[]>;

  delete(id: string): Promise<void>;
}
