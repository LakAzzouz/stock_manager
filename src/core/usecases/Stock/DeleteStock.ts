import { StockRepository } from "../../repositories/StockRepository";
import { Usecases } from "../Usecase";

type DeleteStockInput = {
  id: string;
};

export class DeleteStock implements Usecases<DeleteStockInput, Promise<void>> {
  constructor(private readonly _stockRepository: StockRepository) {}

  async execute(input: DeleteStockInput): Promise<void> {
    await this._stockRepository.delete(input.id);
    return;
  }
}
