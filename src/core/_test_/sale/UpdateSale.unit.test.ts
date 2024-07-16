import { Sale } from "../../entities/Sale";
import { SaleRepository } from "../../repositories/SaleRepository";
import { UpdateSale } from "../../usecases/Sale/UpdateSale";
import { InMemorySaleRepository } from "../../adapters/repositories/InMemorySaleRepository";
import { DataBuilders } from "../tools/DataBuilders";
import { SaleErrors } from "../../errors/SaleErrors";

describe("Unit - update Sale", () => {
  let saleRepository: SaleRepository;
  let updateSale: UpdateSale;
  const saleDb = new Map<string, Sale>();
  const newTotalPrice = 200;

  beforeAll(async () => {
    saleRepository = new InMemorySaleRepository(saleDb);
    updateSale = new UpdateSale(saleRepository);
  });

  afterEach(async () => {
    saleDb.clear();
  });

  it("Should update sale", async () => {
    const sale = DataBuilders.generateSale({});

    saleDb.set(sale.props.id, sale);

    const result = await updateSale.execute({
      id: sale.props.id,
      newTotalPrice,
    });

    expect(result.props.id).toBeDefined();
    expect(result.props.productInfos).toEqual(sale.props.productInfos);
    expect(result.props.saleDate).toBeDefined();
    expect(result.props.totalPrice).toEqual(newTotalPrice);
  });

  it("Should return an error because the sale is not found", async () => {
    const result = updateSale.execute({
      id: "wrong_id",
      newTotalPrice,
    });

    await expect(result).rejects.toThrow(SaleErrors.NotFound);
  });
});
