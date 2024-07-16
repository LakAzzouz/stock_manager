import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { DeleteWarehouse } from "../../usecases/Warehouse/DeleteWarehouse";
import { InMemoryWarehouseRepository } from "../../adapters/repositories/InMemoryWarehouseRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - delete warehouse", () => {
  let deleteWarehouse: DeleteWarehouse;
  const warehouseDb = new Map<string, Warehouse>();

  beforeAll(async () => {
    const warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);
    deleteWarehouse = new DeleteWarehouse(warehouseRepository);
  });

  afterEach(async () => {
    warehouseDb.clear();
  });

  it("Should delete warehouse", async () => {
    const warehouse = DataBuilders.generateWarehouse({});

    warehouseDb.set(warehouse.props.id, warehouse);

    const result = await deleteWarehouse.execute({
      id: warehouse.props.id,
    });

    warehouseDb.get(warehouse.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because id is not found", async () => {
    const warehouse = DataBuilders.generateWarehouse({});

    warehouseDb.set(warehouse.props.id, warehouse);

    const result = deleteWarehouse.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(WarehouseErrors.NotFound);
  });
});
