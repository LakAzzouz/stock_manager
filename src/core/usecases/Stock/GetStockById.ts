import { Stock } from "../../entities/Stock";
import { StockErrors } from "../../errors/StockErrors";
import { StockRepository } from "../../repositories/StockRepository";
import { Usecases } from "../Usecase";

type GetStockByIdInput = {
  id: string;
};

export class GetStockById
  implements Usecases<GetStockByIdInput, Promise<Stock>>
{
  constructor(private readonly _stockRepository: StockRepository) {}

  async execute(input: GetStockByIdInput): Promise<Stock> {
    const stock = await this._stockRepository.getById(input.id);

    if(!stock) {
      throw new StockErrors.NotFound();
    }

    return stock;
  }
}
