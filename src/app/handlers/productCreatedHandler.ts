import { dbTest } from "../../adapters/_test_/tools/dbTest";
import { SqlStockRepository } from "../../adapters/repositories/SQL/SqlStockRepository";
import { SqlStockMapper } from "../../adapters/repositories/mappers/SqlStockMapper";
import { CreateStockData } from "../../core/usecases/Stock/CreateStockData";

const stockMapper = new SqlStockMapper()

const stockRepository = new SqlStockRepository(dbTest, stockMapper)
//const stockDataRepository

//const createStock = new CreateStockData(stockRepository)