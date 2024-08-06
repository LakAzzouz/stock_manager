import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Usecases } from "../Usecase";

type UpdateProductInput = {
  id: string;
  price: number;
};

export class UpdateProduct implements Usecases<UpdateProductInput, Promise<Product>>{
  constructor(
    private readonly _productRepository: ProductRepository) {}

  async execute(input: UpdateProductInput): Promise<Product> {
    const { id, price } = input;

    const product = await this._productRepository.getById(id);

    if(!product) {
      throw new ProductErrors.NotFound();
    }

    const productUpdated = product.update(price);

    return productUpdated;
  }
}
