import { Sale } from "../../entities/Sale";
import { SaleErrors } from "../../errors/SaleErrors";
import { SaleRepository } from "../../repositories/SaleRepository";
import { Usecases } from "../Usecase";

type UpdateSaleInput = {
  id: string;
  newTotalPrice: number;
};

export class UpdateSale implements Usecases<UpdateSaleInput, Promise<Sale>> {
  constructor(private readonly _saleRepository: SaleRepository) {}

  async execute(input: UpdateSaleInput): Promise<Sale> {
    const { id, newTotalPrice } = input;

    const sale = await this._saleRepository.getById(id);

    if(!sale) {
      throw new SaleErrors.NotFound();
    }

    const newSale = sale.update(newTotalPrice);

    return newSale;
  }
}
