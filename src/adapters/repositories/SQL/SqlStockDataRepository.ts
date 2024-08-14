import { Knex } from "knex";
import { StockDataRepository } from "../../../core/repositories/StockDataRepository";
import { SqlStockDataMapper } from "../mappers/SqlStockDataMapper";
import { StockData } from "../../../core/entities/StockData";

export class SqlStockDataRepository implements StockDataRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _stockDataMapper: SqlStockDataMapper
  ) {}

  async saveAll(stockDatas: StockData[]): Promise<void> {
    const stockDataModels = stockDatas.map((elm) => 
        this._stockDataMapper.fromDomain(elm)
    );
    for (const stockDataModel of stockDataModels) {
      await this._knex.raw(
        `INSERT INTO stock_datas (id, product_id, quantity, threshold, stock_id)
        VALUES (:id, :product_id, :quantity, :threshold, :stock_id)`,
        {
          id: stockDataModel.id,
          product_id: stockDataModel.product_id,
          quantity: stockDataModel.quantity,
          threshold: stockDataModel.threshold,
          stock_id: stockDataModel.stock_id
        }
      );
    }
  }
}
