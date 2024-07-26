import { MockMediaGateway } from "../../adapters/gateways/MockMediaGateway";
import { InMemoryProductRepository } from "../../adapters/repositories/InMemoryProductRepository";
import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { MediaGateway } from "../../gateways/MediaGateway";
import { ProductRepository } from "../../repositories/ProductRepository";
import { UploadImage } from "../../usecases/Product/UploadImage";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - upload image", () => {
  let productRepository: ProductRepository;
  let mediaGateway: MediaGateway;
  let uploadImage: UploadImage;
  const productDb = new Map<string, Product>();
  const product = DataBuilders.generateProduct({});
  const image = "";
  const fileName = "Air Jordan";
  const mimetype = "png";

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository(productDb);
    mediaGateway = new MockMediaGateway();
    uploadImage = new UploadImage(productRepository, mediaGateway);
  });

  afterEach(async () => {
    productDb.clear();
  });

  it("Should upload another image", async () => {
    productDb.set(product.props.id, product);

    const result = await uploadImage.execute({
      id: product.props.id,
      image,
      file: Buffer.from(""),
      fileName,
      mimetype,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.image).toEqual(image);
    expect(result.props.name).toBeDefined();
    expect(result.props.price).toBeDefined();
    expect(result.props.productType).toBeDefined();
    expect(result.props.size).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });

  it("Should upload a first image ", async () => {
    product.props.image = undefined
    
    productDb.set(product.props.id, product);

    const result = await uploadImage.execute({
      id: product.props.id,
      image,
      file: Buffer.from(""),
      fileName,
      mimetype,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.image).toEqual(image);
    expect(result.props.name).toBeDefined();
    expect(result.props.price).toBeDefined();
    expect(result.props.productType).toBeDefined();
    expect(result.props.size).toBeDefined();
    expect(result.props.createdAt).toBeDefined();
  });

  it("Should throw an error because product not found", async () => {
    const result = uploadImage.execute({
      id: product.props.id,
      image,
      file: Buffer.from(""),
      fileName,
      mimetype,
    });

    await expect(result).rejects.toThrow(ProductErrors.NotFound);
  });
});
