import { Sale } from "../../entities/Sale";
import { SaleErrors } from "../../errors/SaleErrors";
import { SaleRepository } from "../../repositories/SaleRepository";
import { GetSaleById } from "../../usecases/Sale/GetSaleById";
import { InMemorySaleRepository } from "../../adapters/repositories/InMemorySaleRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - get sale by id", () => {
  let saleRepository: SaleRepository;
  let getSaleById: GetSaleById;
  const saleDb = new Map<string, Sale>();

  beforeAll(async () => {
    saleRepository = new InMemorySaleRepository(saleDb);
    getSaleById = new GetSaleById(saleRepository);
  });

  afterEach(async () => {
    saleDb.clear();
  });

  it("Should get a sale by id", async () => {
    const sale = DataBuilders.generateSale({});

    saleDb.set(sale.props.id, sale);

    const result = await getSaleById.execute({
      id: sale.props.id,
    });

    expect(result).toEqual(sale);
  });

  it("Should throw an error because the sale is not found", async () => {
    const sale = DataBuilders.generateSale({});

    saleDb.set(sale.props.id, sale);

    const result = getSaleById.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(SaleErrors.NotFound);
  });
});
