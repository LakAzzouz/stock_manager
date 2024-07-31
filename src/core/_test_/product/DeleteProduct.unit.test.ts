import { Product } from "../../entities/Product";
import { ProductErrors } from "../../errors/ProductErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { DeleteProduct } from "../../usecases/Product/DeleteProduct";
import { InMemoryProductRepository } from "../../adapters/repositories/InMemoryProductRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - Delete product", () => {
  let productRepository: ProductRepository;
  let deleteProduct: DeleteProduct;
  const productDb = new Map<string, Product>();

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository(productDb);
    deleteProduct = new DeleteProduct(productRepository);
  });

  afterEach(async () => {
    productDb.clear();
  });

  it("Should delete the product", async () => {
    const product = DataBuilders.generateProduct({});

    productDb.set(product.props.id, product);

    await deleteProduct.execute({
      id: product.props.id,
    });

    const result = productDb.get(product.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because the product is not found by id", async () => {
    const product = DataBuilders.generateProduct({});

    productDb.set(product.props.id, product);

    const result = deleteProduct.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(ProductErrors.NotFound)
  });
});
