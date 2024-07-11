import { Sale } from "../../entities/Sale";
import { SaleErrors } from "../../errors/SaleErrors";
import { SaleRepository } from "../../repositories/SaleRepository";
import { DeleteSale } from "../../usecases/Sale/DeleteSale";
import { InMemorySaleRepository } from "../../adapters/repositories/InMemorySaleRepository";
import { DataBuilders } from "../tools/DataBuilders";

describe("Unit - delete sale", () => {
  let saleRepository: SaleRepository;
  let deleteSale: DeleteSale;
  const saleDb = new Map<string, Sale>();

  beforeAll(async () => {
    saleRepository = new InMemorySaleRepository(saleDb);
    deleteSale = new DeleteSale(saleRepository);
  });

  afterEach(async () => {
    saleDb.clear();
  });

  it("Should delete sale", async () => {
    const sale = DataBuilders.generateSale({});

    saleDb.set(sale.props.id, sale);

    const result = await deleteSale.execute({
      id: sale.props.id,
    });

    saleDb.get(sale.props.id);

    expect(result).toBeUndefined();
  });

  it("Should throw an error because the sale is not found", async () => {
    const sale = DataBuilders.generateSale({});

    saleDb.set(sale.props.id, sale);

    const result = deleteSale.execute({
      id: "wrong_id",
    });

    await expect(result).rejects.toThrow(SaleErrors.NotFound);
  });
});
