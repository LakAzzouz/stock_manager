import { Product, ProductType } from "../../entities/Product";
import { MediaGateway } from "../../gateways/MediaGateway";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Size } from "../../valuesObject.ts/SizeProduct";
import { Usecases } from "../Usecase";

type CreateProductInput = {
  name: string;
  productType: ProductType;
  price: number;
  size: number;
  file?: Buffer;
  mimetype?: string;
  fileName?: string;
};

export class CreateProduct implements Usecases<CreateProductInput, Promise<Product>>{
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _mediaGateway: MediaGateway
  ) {}

  async execute(input: CreateProductInput): Promise<Product> {
    const sizeLimit = Size.sizeLength(input.size);

    let url;
    
    if(input.file && input.fileName && input.mimetype) {
      url = await this._mediaGateway.upload(input.file, input.fileName, input.mimetype);
    }

    const product = Product.create({
      name: input.name,
      productType: input.productType,
      image: url,
      price: input.price,
      size: sizeLimit,
    });

    await this._productRepository.save(product);

    return product;
  }
}
