import { Stock } from "../../entities/Stock";
import { Usecases } from "../Usecase";
import { StockRepository } from "../../repositories/StockRepository";
import { Location } from "../../types/LocationType";
import { StockData } from "../../entities/StockData";

type InitiateStockInput = {
  locationId: string;
  stockDatas: StockData[];
  type: Location;
};

export class InitiateStock implements Usecases<InitiateStockInput, Promise<Stock>> {
  constructor(private readonly _stockRepository: StockRepository) {}

  async execute(input: InitiateStockInput): Promise<Stock> {
    const {locationId, stockDatas, type} = input;

    const stock = Stock.initiate({
      stockDatas,
      locationId,
      type
    });

    await this._stockRepository.save(stock);

    return stock;
  }
}
