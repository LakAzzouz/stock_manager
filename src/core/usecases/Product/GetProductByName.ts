import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories.ts/ProductRepository";
import { Usecases } from "../Usecase";

type GetProductByNameInput = {
  name: string;
};

export class GetProductByName
  implements Usecases<GetProductByNameInput, Promise<Product>>
{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(input: GetProductByNameInput): Promise<Product> {
    const product = this._productRepository.getByName(input.name);

    return product;
  }
}
