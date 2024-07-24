import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { MediaGateway } from "../../gateways/MediaGateway";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Usecases } from "../Usecase";

type UploadImageInput = {
  id: string;
  image: string;
  file?: Buffer;
  fileName?: string;
  mimetype: string;
};

export class UploadImage implements Usecases<UploadImageInput, Promise<Product>> {
  constructor(
    private readonly _productRepository: ProductRepository,
    private readonly _mediaGateway: MediaGateway
  ) {}

  async execute(input: UploadImageInput): Promise<Product> {
    const { id, image, file, fileName, mimetype } = input;

    let url;

    if (file && fileName && mimetype) {
      url = await this._mediaGateway.upload(file, fileName, mimetype);
    }

    const product = await this._productRepository.getById(id);

    if (!product) {
      throw new ProductErrors.NotFound();
    }

    const productUpdated = product.updateImage(image);

    await this._productRepository.update(productUpdated);

    return productUpdated;
  }
}
