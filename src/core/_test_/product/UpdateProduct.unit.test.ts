import { Product } from "../../entities/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { UpdateProduct } from "../../usecases/Product/UpdateProduct";
import { InMemoryProductRepository } from "../../adapters/repositories/InMemoryProductRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - update product", () => {
  let productRepository: ProductRepository;
  let updateProduct: UpdateProduct;
  const productDb = new Map<string, Product>();
  const newPrice = 40;

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository(productDb);
    updateProduct = new UpdateProduct(productRepository);
  });

  afterEach(async () => {
    productDb.clear();
  });

  it("Should return a product updated", async () => {
    const product = DataBuilders.generateProduct({});

    productDb.set(product.props.id, product);

    const result = await updateProduct.execute({
      id: product.props.id,
      price: newPrice,
    });

    expect(result.props.price).toEqual(newPrice);
  });
});
