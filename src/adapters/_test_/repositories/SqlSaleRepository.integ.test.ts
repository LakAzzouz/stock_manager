import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SaleErrors } from "../../../core/errors/SaleErrors";
import { SqlSaleRepository } from "../../repositories/SQL/SqlSaleRepository";
import { SqlSaleMapper } from "../../repositories/mappers/SqlSaleMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Sale Repository", () => {
  let sqlSaleMapper: SqlSaleMapper;
  let sqlSaleRepository: SqlSaleRepository;
  const sale = DataBuilders.generateSale({
    id: "id"
  });

  beforeAll(async () => {
    sqlSaleMapper = new SqlSaleMapper();
    sqlSaleRepository = new SqlSaleRepository(dbTest, sqlSaleMapper);
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE sales`);
    await dbTest.raw(`TRUNCATE TABLE product_infos`);
  });

  it("Should save sale and get it by id", async () => {
    await sqlSaleRepository.save(sale);

    const result = await sqlSaleRepository.getById(sale.props.id);

    expect(result).toEqual(sale);
  });

  it("Should delete sale by id", async () => {
    await sqlSaleRepository.save(sale);

    await sqlSaleRepository.delete(sale.props.id);

    const result = sqlSaleRepository.getById(sale.props.id);

    await expect(result).rejects.toThrow(SaleErrors.NotFound);
  })
});
