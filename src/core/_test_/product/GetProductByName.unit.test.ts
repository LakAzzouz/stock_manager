import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { GetProductByName } from "../../usecases/Product/GetProductByName";
import { InMemoryProductRepository } from "../adapters/InMemoryProductRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - Get product by name", () => {
  let productRepository: ProductRepository;
  let getProductByName: GetProductByName;
  const productDb = new Map<string, Product>();

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository(productDb);
    getProductByName = new GetProductByName(productRepository);
  });

  afterEach(async () => {
    productDb.clear();
  });

  it("Should get product by name", async () => {
    const product = DataBuilders.generateProduct({});

    productDb.set(product.props.name, product);

    const result = await getProductByName.execute({
      name: product.props.name,
    });

    expect(result).toEqual(product);
  });

  it("Should throw an error because the name is not found", async () => {
    const product = DataBuilders.generateProduct({});

    productDb.set(product.props.name, product);

    const result = getProductByName.execute({
      name: "wrong_name",
    });

    await expect(result).rejects.toThrow(ProductErrors.NotFound);
  });
});
