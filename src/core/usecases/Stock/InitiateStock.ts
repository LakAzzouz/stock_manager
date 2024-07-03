import { Stock } from "../../entities/Stock";
import { Usecases } from "../Usecase";
import { StockData } from "../../types/StockData";
import { StockRepository } from "../../repositories/StockRepository";

type InitiateStockInput = {
  productId: string;
  stockByLocation: StockData[];
};

export class InitiateStock implements Usecases<InitiateStockInput, Promise<Stock>> {
  constructor(private readonly _stockRepository: StockRepository) {}

  async execute(input: InitiateStockInput): Promise<Stock> {
    await this._stockRepository.ensureThatDoesNotExistByProductId(input.productId);

    const stock = Stock.initiate({
      productId: input.productId,
      stockByLocation: input.stockByLocation,
    });

    return stock;
  }
}
