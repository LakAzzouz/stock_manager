import { Warehouse } from "../entities/Warehouse";

export interface WarehouseRepository {
  save(warehouse: Warehouse): Promise<void>;

  getById(id: string): Promise<Warehouse | null>;

  getByManagerId(managerId: string): Promise<Warehouse | null>;

  getAllIds(): Promise<string[] | null>;

  delete(id: string): Promise<void | null>;
}
