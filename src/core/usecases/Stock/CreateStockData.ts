import { Stock } from "../../entities/Stock";
import { StockData } from "../../entities/StockData";
import { StockErrors } from "../../errors/StockErrors";
import { StockDataRepository } from "../../repositories/StockDataRepository";
import { StockRepository } from "../../repositories/StockRepository";
import { Usecases } from "../Usecase";

type CreateStockDataInput = {
  productId: string;
};

export class CreateStockData implements Usecases<CreateStockDataInput, Promise<StockData[]>> {
  constructor(
    private readonly _stockRepository: StockRepository,
    private readonly _stockDataRepository: StockDataRepository
  ) {}

  async execute(input: CreateStockDataInput): Promise<StockData[]> {
    const { productId } = input;

    const stockIds = await this._stockRepository.getAllIds();

    if(!stockIds) {
      throw new StockErrors.NotFound();
    }
    
    const stockDatas = Stock.createStockDatas({
      productId,
      stockIds
    });

    await this._stockDataRepository.saveAll(stockDatas);
    
    return stockDatas;
  }
}
