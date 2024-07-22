import { StockErrors } from "../../errors/StockErrors";
import { StockRepository } from "../../repositories/StockRepository";
import { Usecases } from "../Usecase";

type DeleteStockInput = {
  id: string;
};

export class DeleteStock implements Usecases<DeleteStockInput, Promise<void>> {
  constructor(private readonly _stockRepository: StockRepository) {}

  async execute(input: DeleteStockInput): Promise<void> {
    const { id } = input;

    const stock = await this._stockRepository.getById(id);

    if (!stock) {
      throw new StockErrors.NotFound();
    }

    await this._stockRepository.delete(stock.props.id);

    return;
  }
}
