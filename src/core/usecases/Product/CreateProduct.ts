import { eventEmitter } from "../../../messages/EventEmitter";
import { ProductCreated } from "../../../messages/product/ProductCreated";
import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { ProductType } from "../../types/ProductType";
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
    const { name, productType, price} = input;

    const sizeLimit = Size.sizeLength(input.size);

    const product = Product.create({
      name,
      productType,
      price,
      size: sizeLimit,
    });

    await this._productRepository.save(product);

    const event = new ProductCreated({
      productId: product.props.id
    });

    eventEmitter.emit("product_created", event);

    return product;
  }
}
