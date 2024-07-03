import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlProductRepository } from "../../repositories/SQL/SqlProductRepository";
import { SqlProductMapper } from "../../repositories/mappers/SqlProductMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Product Repository", () => {
  let sqlProductMapper: SqlProductMapper;
  let sqlProductRepository: SqlProductRepository;
  const product = DataBuilders.generateProduct({});

  beforeAll(async () => {
    sqlProductMapper = new SqlProductMapper();
    sqlProductRepository = new SqlProductRepository(dbTest, sqlProductMapper);
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE products`);
  });

  it("Should save a product and get it by id", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getById(product.props.id);

    expect(product).toEqual(result);
  });

  it("Should get product by name", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.getByName(product.props.name);

    expect(product).toEqual(result)
  });

  it("Should delete product", async () => {
    await sqlProductRepository.save(product);

    const result = await sqlProductRepository.delete(product.props.id);

    expect(result).toBeUndefined()
  });
});
