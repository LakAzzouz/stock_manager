import { Product, ProductType } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories.ts/ProductRepository";
import { GetProductById } from "../../usecases/Product/GetProductById";
import { InMemoryProductRepository } from "../adapters/repositories/InMemoryProductRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - Get product by id", () => {
  let productRepository: ProductRepository;
  let getProductById: GetProductById;
  const productDb = new Map<string, Product>();
  const id = "id";
  const name = "shoes";
  const price = 50;
  const size = 43;

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository(productDb);
    getProductById = new GetProductById(productRepository);
  });

  afterEach(async () => {
    productDb.clear();
  });

  it("Should get product by id", async () => {
    const product = DataBuilders.generateProduct({
      id,
      name,
      productType: ProductType.SHOES,
      price,
      size,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    productDb.set(product.props.id, product);

    const result = await getProductById.execute({
      id: product.props.id,
    });

    expect(result).toEqual(product);
  });

  it("Should throw an error because product is not found", async () => {
    const product = DataBuilders.generateProduct({});

    productDb.set(product.props.id, product);

    const result = getProductById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow("PRODUCT_NOT_FOUND");
  });
});
