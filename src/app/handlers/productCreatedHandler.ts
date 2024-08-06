import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlStockDataRepository } from "../../adapters/repositories/SQL/SqlStockDataRepository";
import { SqlStockRepository } from "../../adapters/repositories/SQL/SqlStockRepository";
import { SqlStockDataMapper } from "../../adapters/repositories/mappers/SqlStockDataMapper";
import { SqlStockMapper } from "../../adapters/repositories/mappers/SqlStockMapper";
import { CreateStockData } from "../../core/usecases/Stock/CreateStockData";
import { eventEmitter } from "../../messages/EventEmitter";
import { ProductCreated } from "../../messages/product/ProductCreated";

const stockMapper = new SqlStockMapper();
const stockDataMapper = new SqlStockDataMapper();

const stockRepository = new SqlStockRepository(dbTest, stockMapper);
const stockDataRepository = new SqlStockDataRepository(dbTest, stockDataMapper);

const createStock = new CreateStockData(stockRepository, stockDataRepository);

eventEmitter.on("product_created", async (event: ProductCreated) => {
  const { productId }  = event.props;

  await createStock.execute({
    productId
  });
  
});
