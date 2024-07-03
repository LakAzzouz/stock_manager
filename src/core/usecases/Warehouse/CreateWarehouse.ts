import { Warehouse } from "../../entities/Warehouse";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type CreateWarehouseInput = {
  city: string;
  numberOfEmployees: number;
};

export class CreateWarehouse implements Usecases<CreateWarehouseInput, Promise<Warehouse>> {
  constructor(private readonly _warehouseRepository: WarehouseRepository) {}

  async execute(input: CreateWarehouseInput): Promise<Warehouse> {
    const warehouse = Warehouse.create({
      city: input.city,
      numberOfEmployees: input.numberOfEmployees,
    });

    await this._warehouseRepository.save(warehouse);

    return warehouse;
  }
}
