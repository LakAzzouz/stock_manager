import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { OrderErrors } from "../../../core/errors/OrderErrors";
import { SqlOderRepository } from "../../repositories/SQL/SqlOrderRepository";
import { SqlOrderMapper } from "../../repositories/mappers/SqlOrderMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Order Repository", () => {
  let sqlOrderMapper: SqlOrderMapper;
  let sqlOrderRepository: SqlOderRepository;
  const order = DataBuilders.generateOrder({
    id: "id",
  });

  beforeAll(async () => {
    sqlOrderMapper = new SqlOrderMapper();
    sqlOrderRepository = new SqlOderRepository(dbTest, sqlOrderMapper);
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE orders`);
    await dbTest.raw(`TRUNCATE TABLE product_infos`);
  });

  it("Should save order and get it by id", async () => {
    await sqlOrderRepository.save(order);

    const result = await sqlOrderRepository.getById(order.props.id);

    expect(result).toEqual(order);
  });

  it("Should delete order", async () => {
    await sqlOrderRepository.save(order);

    await sqlOrderRepository.delete(order.props.id);

    const result = sqlOrderRepository.getById(order.props.id);

    await expect(result).rejects.toThrow(OrderErrors.NotFound);
  });
});
