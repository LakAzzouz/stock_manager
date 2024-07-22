import { Sale } from "../../entities/Sale";
import { ProductRepository } from "../../repositories/ProductRepository";
import { SaleRepository } from "../../repositories/SaleRepository";
import { ProductInfo } from "../../types/ProductInfo";
import { Usecases } from "../Usecase";

type CreateSaleInput = {
  productInfos: ProductInfo[];
};

export class CreateSale implements Usecases<CreateSaleInput, Promise<Sale>> {
  constructor(
    private readonly _saleRepository: SaleRepository,
    private readonly _productRepository: ProductRepository
  ) {}

  async execute(input: CreateSaleInput): Promise<Sale> {
    const { productInfos } = input;

    const productInfo = await this._productRepository.getTotalPriceByProductIds(productInfos);

    const totalPrice = productInfo.totalPrice;

    const sale = Sale.create({
      productInfos,
      totalPrice
    });

    await this._saleRepository.save(sale);

    return sale;
  }
}
