import { SaleErrors } from "../../errors/SaleErrors";
import { SaleRepository } from "../../repositories/SaleRepository";
import { Usecases } from "../Usecase";

type DeleteSaleInput = {
  id: string;
};

export class DeleteSale implements Usecases<DeleteSaleInput, Promise<void>> {
  constructor(private readonly _saleRepository: SaleRepository) {}

  async execute(input: DeleteSaleInput): Promise<void> {
    const { id } = input;

    const sale = await this._saleRepository.getById(id);

    if (!sale) {
      throw new SaleErrors.NotFound();
    }

    await this._saleRepository.delete(sale.props.id)

    return;
  }
}
