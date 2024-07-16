import { InMemoryWarehouseRepository } from "../../adapters/repositories/InMemoryWarehouseRepository";
import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { GetAllWarehouseByIds } from "../../usecases/Warehouse/GetAllWarehouseByIds";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get all warehouse by ids", () => {
  let warehouseRepository: WarehouseRepository;
  let getAllStoreByIds: GetAllWarehouseByIds;
  const warehouseDB = new Map<string, Warehouse>();
  const warehouse1 = DataBuilders.generateWarehouse({})
  const warehouse2 = DataBuilders.generateWarehouse({})
  const ids = [warehouse1.props.id, warehouse2.props.id];

  beforeAll(async () => {
    warehouseRepository = new InMemoryWarehouseRepository(warehouseDB);
    getAllStoreByIds = new GetAllWarehouseByIds(warehouseRepository);
  });

  afterEach(async () => {
    warehouseDB.clear();
  });

  it("Should return all warehouse ids", async () => {
    warehouseDB.set(warehouse1.props.id, warehouse1);
    warehouseDB.set(warehouse2.props.id, warehouse2);

    const result = await getAllStoreByIds.execute({
      ids,
    });

    expect(result).toHaveLength(2);
  });

  it("Should throw an error because warehouse is not found", async () => {
    const result = getAllStoreByIds.execute({
      ids,
    });

    await expect(result).rejects.toThrow(WarehouseErrors.NotFound);
  });
});
