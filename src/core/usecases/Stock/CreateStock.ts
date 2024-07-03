import { Stock } from "../../entities/Stock";
import { StockRepository } from "../../repositories/StockRepository";
import { StoreRepository } from "../../repositories/StoreRepository";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { Usecases } from "../Usecase";

type CreateStockInput = {
  productId: string;
};

export class CreateStock implements Usecases<CreateStockInput, Promise<Stock>> {
  constructor(
    private readonly _stockRepository: StockRepository,
    private readonly _storeRepository: StoreRepository,
    private readonly _warehouseRepository: WarehouseRepository
  ) {}

  async execute(input: CreateStockInput): Promise<Stock> {
    await this._stockRepository.ensureThatDoesNotExistByProductId(input.productId)

    const storeIds = await this._storeRepository.getAllIds();
    const warehouseIds = await this._warehouseRepository.getAllIds();

    const stock = Stock.create({
      productId: input.productId,
      storeIds,
      warehouseIds,
    });

    await this._stockRepository.save(stock)

    return stock;
  }
}
