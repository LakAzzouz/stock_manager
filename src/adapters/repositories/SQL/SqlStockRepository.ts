import { Knex } from "knex";
import { StockRepository } from "../../../core/repositories/StockRepository";
import { SqlStockMapper } from "../mappers/SqlStockMapper";
import { Stock } from "../../../core/entities/Stock";

export class SqlStockRepository implements StockRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _stockMapper: SqlStockMapper
  ) {}
  ensureThatDoesNotExistByProductId(productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  checkStockAlreadyExistById(ProductId: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async save(stock: Stock): Promise<void> {
    const stockModel = this._stockMapper.fromDomain(stock);
    await this._knex.raw(
      `INSERT INTO stocks (id, product_id, stock_by_location, created_at, updated_at)
        VALUES (:id, :product_id, :stock_by_location, :created_at, :updated_at)`,
      {
        id: stockModel.id,
        product_id: stockModel.product_id,
        stock_by_location: stockModel.stock_by_location,
        created_at: stockModel.created_at,
        updated_at: stockModel.updated_at,
      }
    );
  }

  async getById(id: string): Promise<Stock> {
    const stockModel = await this._knex.raw(
      `SELECT * FROM stocks WHERE id = :id`,
      {
        id: id,
      }
    );
    const stock = this._stockMapper.toDomain(stockModel);

    return stock;
  }

  async checkStockNotFoundByProductId(ProductId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async delete(id: string): Promise<void> {
    await this._knex.raw(`DELETE FROM stocks WHERE id = :id`, {
      id: id,
    });
  }
}
