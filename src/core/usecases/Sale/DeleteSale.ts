import { SaleRepository } from "../../repositories/SaleRepository";
import { Usecases } from "../Usecase";

type DeleteSaleInput = {
  id: string;
};

export class DeleteSale implements Usecases<DeleteSaleInput, Promise<void>> {
  constructor(private readonly _saleRepository: SaleRepository) {}

  async execute(input: DeleteSaleInput): Promise<void> {
    await this._saleRepository.delete(input.id)

    return;
  }
}
