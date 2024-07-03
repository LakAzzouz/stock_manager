import { Warehouse } from "../../entities/Warehouse";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type GetWarehouseByIdInput = {
  id: string;
};

export class GetWarehouseById implements Usecases<GetWarehouseByIdInput, Promise<Warehouse>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: GetWarehouseByIdInput): Promise<Warehouse> {
    const warehouse = await this._warehouseRepository.getById(input.id);

    return warehouse
  }
}
