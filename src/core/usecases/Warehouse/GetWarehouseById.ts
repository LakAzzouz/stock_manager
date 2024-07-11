import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type GetWarehouseByIdInput = {
  id: string;
};

export class GetWarehouseById implements Usecases<GetWarehouseByIdInput, Promise<Warehouse>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: GetWarehouseByIdInput): Promise<Warehouse> {
    const warehouse = await this._warehouseRepository.getById(input.id);

    if(!warehouse) {
      throw new WarehouseErrors.NotFound();
    }

    return warehouse;
  }
}
