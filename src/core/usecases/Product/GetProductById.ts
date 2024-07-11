import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Usecases } from "../Usecase";

type GetProductByIdInput = {
  id: string;
};

export class GetProductById implements Usecases<GetProductByIdInput, Promise<Product>>{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(input: GetProductByIdInput): Promise<Product> {
    const product = await this._productRepository.getById(input.id);
    
    if(!product) {
      throw new ProductErrors.NotFound();
    }

    return product;
  }
}
