import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type UpdateWarehouseInput = {
  id: string;
  newNumberOfEmployees: number;
};

export class UpdateWarehouse implements Usecases<UpdateWarehouseInput, Promise<Warehouse>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: UpdateWarehouseInput): Promise<Warehouse> {
    const { id, newNumberOfEmployees } = input;

    const warehouse = await this._warehouseRepository.getById(id);

    if(!warehouse) {
      throw new WarehouseErrors.NotFound();
    }

    warehouse.update(newNumberOfEmployees);

    return warehouse;
  }
}
