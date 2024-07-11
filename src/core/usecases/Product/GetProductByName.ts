import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Usecases } from "../Usecase";

type GetProductByNameInput = {
  name: string;
};

export class GetProductByName implements Usecases<GetProductByNameInput, Promise<Product>>{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(input: GetProductByNameInput): Promise<Product> {
    const product = await this._productRepository.getByName(input.name);

    if(!product) {
      throw new ProductErrors.NotFound();
    }

    return product;
  }
}
