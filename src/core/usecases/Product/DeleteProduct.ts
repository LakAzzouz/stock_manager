import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories.ts/ProductRepository";
import { Usecases } from "../Usecase";

type DeleteProductInput = {
  id: string;
};

export class DeleteProduct implements Usecases<DeleteProductInput, Promise<void>>{
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(input: DeleteProductInput): Promise<void> {
    await this._productRepository.delete(input.id);

    return;
  }
}
