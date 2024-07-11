import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { GetWarehouseByManagerId } from "../../usecases/Warehouse/GetWarehouseByManagerId";
import { InMemoryWarehouseRepository } from "../../adapters/repositories/InMemoryWarehouseRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get warehouse by managerId", () => {
  let warehouseRepository: WarehouseRepository;
  let getWarehouseByManagerId: GetWarehouseByManagerId;
  const warehouseDb = new Map<string, Warehouse>();

  beforeAll(async () => {
    warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);
    getWarehouseByManagerId = new GetWarehouseByManagerId(warehouseRepository);
  });

  afterEach(async () => {
    warehouseDb.clear();
  });

  it("Should get warehouse by manager id", async () => {
    const warehouse = DataBuilders.generateWarehouse({});

    warehouseDb.set(warehouse.props.managerId, warehouse);

    const result = await getWarehouseByManagerId.execute({
      managerId: warehouse.props.managerId,
    });

    expect(result).toEqual(warehouse);
  });

  it("Should throw an error because manager id is not found", async () => {
    const warehouse = DataBuilders.generateWarehouse({});

    warehouseDb.set(warehouse.props.managerId, warehouse);

    const result = getWarehouseByManagerId.execute({
      managerId: "wrong_id"
    });

    await expect(result).rejects.toThrow(WarehouseErrors.NotFound);
  })
});
