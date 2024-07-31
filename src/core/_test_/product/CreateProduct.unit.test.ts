import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { MediaGateway } from "../../gateways/MediaGateway";
import { ProductRepository } from "../../repositories/ProductRepository";
import { CreateProduct } from "../../usecases/Product/CreateProduct";
import { InMemoryProductRepository } from "../../adapters/repositories/InMemoryProductRepository";
import { MockMediaGateway } from "../../adapters/gateways/MockMediaGateway";
import { ProductType } from "../../types/ProductType";

describe("Unit - Create product", () => {
  let productRepository: ProductRepository;
  let createProduct: CreateProduct;
  let mediaGateway: MediaGateway;
  const productDb = new Map<string, Product>();
  const name = "Air Jordan";
  const size = 43;
  const price = 50;

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository(productDb);
    mediaGateway = new MockMediaGateway()
    createProduct = new CreateProduct(productRepository);
  });

  afterEach(async () => {
    productDb.clear();
  });

  it("Should create a product", async () => {
    const result = await createProduct.execute({
      name,
      productType: ProductType.SHOES,
      price,
      size,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.name).toEqual(name);
    expect(result.props.productType).toEqual(ProductType.SHOES);
    expect(result.props.size).toEqual(size);
    expect(result.props.price).toEqual(price);
    expect(result.props.createdAt).toBeDefined();
  });

  it("Should save a product", async () => {
    const product = await createProduct.execute({
      name,
      productType: ProductType.SHOES,
      price,
      size,
    });
    
    expect(productDb.get(product.props.id)).toEqual(product)
  })

  it("Should throw an error because the size is wrong", async () => {
    const result = createProduct.execute({
      name,
      productType: ProductType.SHOES,
      price,
      size: 35,
    });
    await expect(result).rejects.toThrow(ProductErrors.SizeErrors);
  });

  it("Should upload image in the server", async () => {
    const result = await createProduct.execute({
      name,
      productType: ProductType.SHOES,
      price,
      size
    })

    expect(result).toBeDefined()
  })

});
