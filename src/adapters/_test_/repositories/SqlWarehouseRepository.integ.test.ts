import { DataBuilders } from "../../../core/_test_/tools/DataBuilders";
import { SqlWarehouseRepository } from "../../repositories/SQL/SqlWarehouseRepository";
import { SqlWarehouseMapper } from "../../repositories/mappers/SqlWarehouseMapper";
import { dbTest } from "../tools/dbTest";

describe("Integ - Sql Warehouse Repository", () => {
  let sqlWarehouseMapper: SqlWarehouseMapper;
  let sqlWarehouseRepository: SqlWarehouseRepository;
  const warehouse = DataBuilders.generateWarehouse({});
  const warehouse2 = DataBuilders.generateWarehouse();

  beforeAll(async () => {
    sqlWarehouseMapper = new SqlWarehouseMapper();
    sqlWarehouseRepository = new SqlWarehouseRepository(
      dbTest,
      sqlWarehouseMapper
    );
  });

  beforeEach(async () => {
    await dbTest.raw(`TRUNCATE TABLE warehouses`);
  });

  it("Should save warehouse and get it by id", async () => {
    await sqlWarehouseRepository.save(warehouse);

    const result = await sqlWarehouseRepository.getById(warehouse.props.id);

    expect(result).toEqual(warehouse);
  });

  it("Should get warehouse by manager id", async () => {
    await sqlWarehouseRepository.save(warehouse);

    const result = await sqlWarehouseRepository.getByManagerId(
      warehouse.props.managerId
    );

    expect(result).toEqual(warehouse);
  });

  it("Should delete warehouse by id", async () => {
    await sqlWarehouseRepository.save(warehouse);

    const result = await sqlWarehouseRepository.delete(warehouse.props.id);

    expect(result).toBeUndefined();
  });

  it("Should get warehouses by ids", async () => {
    await sqlWarehouseRepository.save(warehouse);
    await sqlWarehouseRepository.save(warehouse2);

    const result = await sqlWarehouseRepository.getAllIds();

    expect(result).toHaveLength(2);
  });
});
