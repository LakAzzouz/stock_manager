import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type DeleteWarehouseInput = {
  id: string;
};

export class DeleteWarehouse implements Usecases<DeleteWarehouseInput, Promise<void>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: DeleteWarehouseInput): Promise<void> {
    await this._warehouseRepository.delete(input.id)

    return;
  }
}
