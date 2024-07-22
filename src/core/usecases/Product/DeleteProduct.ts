import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Usecases } from "../Usecase";

type DeleteProductInput = {
  id: string;
};

export class DeleteProduct implements Usecases<DeleteProductInput, Promise<void>> {
  constructor(private readonly _productRepository: ProductRepository) {}

  async execute(input: DeleteProductInput): Promise<void> {
    const { id } = input;

    const product = await this._productRepository.getById(id);

    if (!product) {
      throw new ProductErrors.NotFound();
    }

    await this._productRepository.delete(product.props.id);

    return;
  }
}
