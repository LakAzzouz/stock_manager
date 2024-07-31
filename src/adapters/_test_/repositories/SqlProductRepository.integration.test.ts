import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlOderRepository } from "../../repositories/SQL/SqlOrderRepository";
import { SqlProductRepository } from "../../repositories/SQL/SqlProductRepository";
import { SqlSaleRepository } from "../../repositories/SQL/SqlSaleRepository";
import { SqlOrderMapper } from "../../repositories/mappers/SqlOrderMapper";
import { SqlProductMapper } from "../../repositories/mappers/SqlProductMapper";
import { SqlSaleMapper } from "../../repositories/mappers/SqlSaleMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Product Repository", () => {
  let sqlProductMapper: SqlProductMapper;
  let sqlSaleMapper: SqlSaleMapper;
  let sqlProductRepository: SqlProductRepository;
  let sqlSaleRepository: SqlSaleRepository;
  let sqlOrderRepository: SqlOderRepository;
  let sqlOrderMapper: SqlOrderMapper;

  const product = DataBuilders.generateProduct({
    id: "id",
    price: 1,
  });
  const product2 = DataBuilders.generateProduct({
    id: "id2",
    price: 10,
  });
  const product3 = DataBuilders.generateProduct({
    image: undefined,
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

  const order = DataBuilders.generateOrder({
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
    sqlOrderMapper = new SqlOrderMapper();
    sqlOrderRepository = new SqlOderRepository(dbTest, sqlOrderMapper);
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

  it("Should update product with a first image", async () => {
    await sqlProductRepository.save(product3);

    const productImage = (product3.props.image = "first_image");

    await sqlProductRepository.update(product3);

    const productUpdated = await sqlProductRepository.getById(
      product3.props.id
    );

    expect(productUpdated.props.image).toEqual(productImage);
  });

  it("Should update product with a new image", async () => {
    await sqlProductRepository.save(product);

    const productImage = (product.props.image = "new_image");

    await sqlProductRepository.update(product);

    const productUpdated = await sqlProductRepository.getById(product.props.id);

    expect(productUpdated.props.image).toEqual(productImage);
  });

  it("Should get product by name", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getByName(product.props.name);

    expect(result).toEqual(product);
  });

  it("Should get total price by product ids", async () => {
    await sqlProductRepository.save(product);
    await sqlSaleRepository.save(sale);

    const result = await sqlProductRepository.getTotalPriceByProductIds(
      sale.props.productInfos
    );

    expect(result).toEqual(
      product.props.price * sale.props.productInfos[0].quantity
    );
  });

  it("Should delete product", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.delete(product.props.id);

    expect(result).toBeUndefined();
  });
});
