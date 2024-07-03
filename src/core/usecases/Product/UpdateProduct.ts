import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Usecases } from "../Usecase";

type UpdateProductInput = {
  id: string;
  price: number;
};

export class UpdateProduct implements Usecases<UpdateProductInput, Promise<Product>>{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    const product = await this._productRepository.getById(input.id);

    const productUpdated = product.update(input.price);

    return productUpdated;
  }
}
