import { Knex } from "knex";
import { Warehouse } from "../../../core/entities/Warehouse";
import { WarehouseRepository } from "../../../core/repositories/WarehouseRepository";
import { SqlWarehouseMapper } from "../mappers/SqlWarehouseMapper";

export class SqlWarehouseRepository implements WarehouseRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _warehouseMapper: SqlWarehouseMapper
  ) {}
  
  getAllIds(): Promise<string[]> {
    throw new Error("Method not implemented.");
  }

  async save(warehouse: Warehouse): Promise<void> {
    const warehouseModel = this._warehouseMapper.fromDomain(warehouse);
    await this._knex.raw(
      `INSERT INTO warehouses (id, city, manager_id, number_of_employees, created_at, updated_at)
        VALUES (:id, :city, :manager_id, :number_of_employees, :created_at, :updated_at)`,
      {
        id: warehouseModel.id,
        city: warehouseModel.city,
        manager_id: warehouseModel.manager_id,
        number_of_employees: warehouseModel.number_of_employees,
        created_at: warehouseModel.created_at,
        updated_at: warehouseModel.updated_at,
      }
    );
  }

  async getById(id: string): Promise<Warehouse> {
    const warehouseModel = await this._knex.raw(
      `SELECT * FROM warehouses WHERE id = :id`,
      {
        id: id,
      }
    );

    const warehouse = this._warehouseMapper.toDomain(warehouseModel[0][0]);

    return warehouse;
  }

  async getByManagerId(managerId: string): Promise<Warehouse> {
    const warehouseModel = await this._knex.raw(
      `SELECT * FROM warehouses WHERE manager_id = :manager_id`,
      {
        manager_id: managerId,
      }
    );

    const warehouse = this._warehouseMapper.toDomain(warehouseModel[0][0]);

    return warehouse;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(`DELETE FROM warehouses WHERE id = :id`, {
      id: id,
    });
  }
}
