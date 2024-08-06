import { Sale } from "../../entities/Sale";
import { SaleErrors } from "../../errors/SaleErrors";
import { SaleRepository } from "../../repositories/SaleRepository";
import { Usecases } from "../Usecase";

type GetSaleByIdInput = {
  id: string;
};

export class GetSaleById implements Usecases<GetSaleByIdInput, Promise<Sale>> {
  constructor(private readonly _saleRepository: SaleRepository) {}

  async execute(input: GetSaleByIdInput): Promise<Sale> {
    const { id } = input;

    const sale = await this._saleRepository.getById(id);

    if(!sale) {
      throw new SaleErrors.NotFound();
    }

    return sale;
  }
}
