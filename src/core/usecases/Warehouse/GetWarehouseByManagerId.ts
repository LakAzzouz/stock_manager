import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type GetWarehouseByManagerIdInput = {
  managerId: string;
};

export class GetWarehouseByManagerId implements Usecases<GetWarehouseByManagerIdInput, Promise<Warehouse>>{
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: GetWarehouseByManagerIdInput): Promise<Warehouse> {
    const { managerId } = input;

    const warehouse = await this._warehouseRepository.getByManagerId(managerId);

    if (!warehouse) {
      throw new WarehouseErrors.NotFound();
    }

    return warehouse;
  }
}
