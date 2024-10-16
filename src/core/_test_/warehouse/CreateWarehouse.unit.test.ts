import { Warehouse } from "../../entities/Warehouse";
import { CreateWarehouse } from "../../usecases/Warehouse/CreateWarehouse";
import { InMemoryWarehouseRepository } from "../../adapters/repositories/InMemoryWarehouseRepository";

describe("Unit - create warehouse", () => {
  let createWarehouse: CreateWarehouse;
  const warehouseDb = new Map<string, Warehouse>();
  const city = "Paris";
  const numberOfEmployees = 20;

  beforeAll(async () => {
    const warehouseRepository = new InMemoryWarehouseRepository(warehouseDb);
    createWarehouse = new CreateWarehouse(warehouseRepository);
  });

  afterEach(async () => {
    warehouseDb.clear();
  });

  it("Should create a warehouse", async () => {
    const result = await createWarehouse.execute({
      city,
      numberOfEmployees,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.managerId).toBeDefined();
    expect(result.props.city).toEqual(city);
    expect(result.props.numberOfEmployees).toEqual(numberOfEmployees);
    expect(result.props.createdAt).toBeDefined();
    expect(result.props.updatedAt).toBeDefined();
  });

  it("Should save warehouse", async () => {
    const warehouse = await createWarehouse.execute({
      city,
      numberOfEmployees,
    });

    expect(warehouseDb.get(warehouse.props.id)).toEqual(warehouse);
  });
});
