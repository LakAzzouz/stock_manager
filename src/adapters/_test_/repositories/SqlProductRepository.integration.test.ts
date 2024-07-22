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
  const product = DataBuilders.generateProduct();
  const sale = DataBuilders.generateSale();

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

    expect(product).toEqual(result);
  });

  it("Should get product by name", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getByName(product.props.name);

    expect(result).toEqual(product);
  });

  it("Should get total price by product ids", async () => {
    await sqlProductRepository.save(product);
    await sqlSaleRepository.save(sale);

    const result = await sqlProductRepository.getTotalPriceByProductIds(sale.props.productInfos);

    expect(result).toEqual(sale.props.totalPrice)
  });

  it("Should delete product", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.delete(product.props.id);

    expect(result).toBeUndefined();
  });
});
