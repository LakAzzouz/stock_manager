import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type GetAllWarehouseByIdsInput = {};

export class GetAllWarehouseByIds implements Usecases<GetAllWarehouseByIdsInput, Promise<string[]>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: GetAllWarehouseByIdsInput): Promise<string[]> {
    const warehouses = await this._warehouseRepository.getAllIds();

    if (!warehouses) {
      throw new WarehouseErrors.NotFound();
    }

    return warehouses;
  }
}
