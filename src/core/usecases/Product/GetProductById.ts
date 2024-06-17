import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories.ts/ProductRepository";
import { Usecases } from "../Usecase";

type GetProductByIdInput = {
  id: string;
};

export class GetProductById implements Usecases<GetProductByIdInput, Promise<Product>>{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(input: GetProductByIdInput): Promise<Product> {
    const product = this._productRepository.getById(input.id)

    return product
  }
}
