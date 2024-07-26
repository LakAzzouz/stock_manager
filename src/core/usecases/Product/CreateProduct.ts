import { Product, ProductType } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Size } from "../../valuesObject.ts/SizeProduct";
import { Usecases } from "../Usecase";

type CreateProductInput = {
  name: string;
  productType: ProductType;
  price: number;
  size: number;
};

export class CreateProduct implements Usecases<CreateProductInput, Promise<Product>>{
  constructor(
    private readonly _productRepository: ProductRepository,
  ) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const sizeLimit = Size.sizeLength(input.size);

    const product = Product.create({
      name: input.name,
      productType: input.productType,
      price: input.price,
      size: sizeLimit,
    });

    await this._productRepository.save(product);

    // event => creation stockData 

    return product;
  }
}
