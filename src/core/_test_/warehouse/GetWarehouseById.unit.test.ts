import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { GetWarehouseById } from "../../usecases/Warehouse/GetWarehouseById";
import { InMemoryWarehouseRepository } from "../../adapters/repositories/InMemoryWarehouseRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get warehouse by id", () => {
  let getWarehouseById: GetWarehouseById;
  const warehouseDb = new Map<string, Warehouse>();
  const warehouse = DataBuilders.generateWarehouse({});

  beforeAll(async () => {
    const warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);
    getWarehouseById = new GetWarehouseById(warehouseRepository);
  });

  afterEach(async () => {
    warehouseDb.clear();
  });

  it("Should get warehouse by id", async () => {
    warehouseDb.set(warehouse.props.id, warehouse);

    const result = await getWarehouseById.execute({
      id: warehouse.props.id,
    });

    expect(result).toEqual(warehouse);
  });

  it("Should throw an error because warehouse id is not found", async () => {
    warehouseDb.set(warehouse.props.id, warehouse);

    const result = getWarehouseById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(WarehouseErrors.NotFound);
  });
});
