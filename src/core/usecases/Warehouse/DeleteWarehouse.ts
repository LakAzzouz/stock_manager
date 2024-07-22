import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type DeleteWarehouseInput = {
  id: string;
};

export class DeleteWarehouse implements Usecases<DeleteWarehouseInput, Promise<void>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: DeleteWarehouseInput): Promise<void> {
    const { id } = input;

    const user = await this._warehouseRepository.getById(id);

    if (!user) {
      throw new WarehouseErrors.NotFound();
    }
    await this._warehouseRepository.delete(input.id);

    return;
  }
}
