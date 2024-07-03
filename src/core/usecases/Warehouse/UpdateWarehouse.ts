import { Warehouse } from "../../entities/Warehouse";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type UpdateWarehouseInput = {
  id: string;
  newNumberOfEmployees: number;
};

export class UpdateWarehouse implements Usecases<UpdateWarehouseInput, Promise<Warehouse>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: UpdateWarehouseInput): Promise<Warehouse> {
    const warehouse = await this._warehouseRepository.getById(input.id);

    warehouse.update(input.newNumberOfEmployees);

    return warehouse;
  }
}
