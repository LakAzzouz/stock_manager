import { Warehouse } from "../../entities/Warehouse";
import { WarehouseErrors } from "../../errors/WarehouseErrors";
import { WarehouseRepository } from "../../repositories/WarehouseRepository";
import { GetWarehouseById } from "../../usecases/Warehouse/GetWarehouseById";
import { InMemoryWarehouseRepository } from "../adapters/InMemoryWarehouseRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get warehouse by id", () => {
  let warehouseRepository: WarehouseRepository;
  let getWarehouseById: GetWarehouseById;
  const warehouseDb = new Map<string, Warehouse>();
  const id = "id";
  const city = "Paris";
  const managerId = "managerId";
  const numberOfEmployees = 20;
  const createdAt = new Date();
  const updatedAt = new Date();

  beforeAll(async () => {
    warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);
    getWarehouseById = new GetWarehouseById(warehouseRepository);
  });

  afterEach(async () => {
    warehouseDb.clear();
  });

  it("Should get warehouse by id", async () => {
    const warehouse = DataBuilders.generateWarehouse({
      id,
      city,
      managerId,
      numberOfEmployees,
      createdAt,
      updatedAt,
    });

    warehouseDb.set(warehouse.props.id, warehouse);

    const result = await getWarehouseById.execute({
      id: warehouse.props.id,
    });

    expect(result).toEqual(warehouse);
  });

  it("Should throw an error because id is not found", async () => {
    const warehouse = DataBuilders.generateWarehouse({});

    warehouseDb.set(warehouse.props.id, warehouse);

    const result = getWarehouseById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(WarehouseErrors.NotFound);
  });
});
