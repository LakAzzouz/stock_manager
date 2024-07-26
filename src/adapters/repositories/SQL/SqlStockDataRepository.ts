import { StockDataRepository } from "../../../core/repositories/StockDataRepository";

export class SqlStockDataRepository implements StockDataRepository {
    constructor(
        private readonly _knex: Knex,
        private readonly _stockDataMapper: 
    )
}