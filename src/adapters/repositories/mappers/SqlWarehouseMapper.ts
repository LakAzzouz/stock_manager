import { Warehouse } from "../../../core/entities/Warehouse";
import { WarehouseModel } from "../models/WarehouseModel";
import { Mapper } from "./Mapper";

export class SqlWarehouseMapper implements Mapper<WarehouseModel, Warehouse> {
  toDomain(raw: WarehouseModel): Warehouse {
    const warehouse = new Warehouse({
      id: raw.id,
      city: raw.city,
      managerId: raw.manager_id,
      numberOfEmployees: raw.number_of_employees,
      createdAt: raw.created_at,
      updatedAt: raw.updated_at,
    });
    return warehouse;
  }

  fromDomain(data: Warehouse): WarehouseModel {
    const warehouseModel: WarehouseModel = {
      id: data.props.id,
      city: data.props.city,
      manager_id: data.props.managerId,
      number_of_employees: data.props.numberOfEmployees,
      created_at: data.props.createdAt,
      updated_at: data.props.updatedAt,
    };
    return warehouseModel;
  }
}
