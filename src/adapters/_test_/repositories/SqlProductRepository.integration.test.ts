import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlProductRepository } from "../../repositories/SQL/SqlProductRepository";
import { SqlSaleRepository } from "../../repositories/SQL/SqlSaleRepository";
import { SqlProductMapper } from "../../repositories/mappers/SqlProductMapper";
import { SqlSaleMapper } from "../../repositories/mappers/SqlSaleMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Product Repository", () => {
  let sqlProductMapper: SqlProductMapper;
  let sqlSaleMapper: SqlSaleMapper;
  let sqlProductRepository: SqlProductRepository;
  let sqlSaleRepository: SqlSaleRepository;

  const product = DataBuilders.generateProduct({
    id: "id",
    price: 1,
  });

  const sale = DataBuilders.generateSale({
    productInfos: [
      {
        productId: "id",
        quantity: 10,
      },
      {
        productId: "id2",
        quantity: 100,
      },
    ],
  });

  beforeAll(async () => {
    sqlProductMapper = new SqlProductMapper();
    sqlSaleMapper = new SqlSaleMapper();
    sqlProductRepository = new SqlProductRepository(dbTest, sqlProductMapper);
    sqlSaleRepository = new SqlSaleRepository(dbTest, sqlSaleMapper);
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE products`);
    await dbTest.raw(`TRUNCATE TABLE sales`);
    await dbTest.raw(`TRUNCATE TABLE product_infos`);
  });

  it("Should save a product and get it by id", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getById(product.props.id);

    expect(result).toEqual(product);
  });

  it("Should save a product but return null", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getById("");

    expect(result).toEqual(null);
  });

  it("Should get product by name", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getByName(product.props.name);

    expect(result).toEqual(product);
  });

  it("Should save a product but return null", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getByName("");

    expect(result).toEqual(null);
  });

  it("Should get total price by product ids", async () => {
    await sqlProductRepository.save(product);
    await sqlSaleRepository.save(sale);

    const result = await sqlProductRepository.getTotalPriceByProductIds(sale.props.productInfos);

    expect(result).toEqual(product.props.price * sale.props.productInfos[0].quantity);
  });

  it("Should delete product", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.delete(product.props.id);

    expect(result).toBeUndefined();
  });
});
