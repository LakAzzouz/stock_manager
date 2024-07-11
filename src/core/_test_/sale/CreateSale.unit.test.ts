import { Product } from "../../entities/Product";
import { Sale } from "../../entities/Sale";
import { ProductErrors } from "../../errors/ProductErrors";
import { SaleErrors } from "../../errors/SaleErrors";
import { ProductRepository } from "../../repositories/ProductRepository";
import { SaleRepository } from "../../repositories/SaleRepository";
import { CreateSale } from "../../usecases/Sale/CreateSale";
import { InMemoryProductRepository } from "../../adapters/repositories/InMemoryProductRepository";
import { InMemorySaleRepository } from "../../adapters/repositories/InMemorySaleRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - create sale", () => {
  let productRepository: ProductRepository;
  let saleRepository: SaleRepository;
  let createSale: CreateSale;
  const productDb = new Map<string, Product>();
  const saleDb = new Map<string, Sale>();
  const productId = "product_id";
  const quantity = 10;
  const productInfos = [
    {
      productId,
      quantity,
    },
  ];

  beforeAll(async () => {
    productRepository = new InMemoryProductRepository(productDb);
    saleRepository = new InMemorySaleRepository(saleDb);
    createSale = new CreateSale(saleRepository, productRepository);
  });

  afterEach(async () => {
    productDb.clear();
    saleDb.clear();
  });

  it("Should create a sale", async () => {
    const product = DataBuilders.generateProduct({
      id: productId,
    });

    productDb.set(product.props.id, product);

    const result = await createSale.execute({
      productInfos,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.saleDate).toBeDefined();
    expect(result.props.productInfos).toEqual(productInfos);
    expect(result.props.totalPrice).toEqual(product.props.price * quantity);
  });
});
