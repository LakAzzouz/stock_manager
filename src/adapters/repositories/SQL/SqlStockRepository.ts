import { Knex } from "knex";
import { StockRepository } from "../../../core/repositories/StockRepository";
import { SqlStockMapper } from "../mappers/SqlStockMapper";
import { Stock } from "../../../core/entities/Stock";
import { StockData } from "../../../core/types/StockData";
import { StockErrors } from "../../../core/errors/StockErrors";

export class SqlStockRepository implements StockRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _stockMapper: SqlStockMapper
  ) {}

  async save(stock: Stock): Promise<void> {
    const stockModel = this._stockMapper.fromDomain(stock);
    const tx = await this._knex.transaction();
    const productId = stockModel.stock_datas.map((elm) => elm.product_id)[0];
    const quantity = stockModel.stock_datas.map((elm) => elm.quantity)[0];
    const threshold = stockModel.stock_datas.map((elm) => elm.threshold)[0];
    try {
      await tx.raw(
        `INSERT INTO stocks (id, location_id, type, created_at, updated_at)
        VALUES (:id, :location_id, :type, :created_at, :updated_at)`,
        {
          id: stockModel.id,
          location_id: stockModel.location_id,
          type: stockModel.type,
          created_at: stockModel.created_at,
          updated_at: stockModel.updated_at ? stockModel.updated_at : null,
        }
      );
      await tx.raw(
        `INSERT INTO stock_datas (product_id, quantity, threshold, stock_id)
        VALUES (:product_id, :quantity, :threshold, :stock_id)`,
        {
          product_id: productId,
          quantity: quantity,
          threshold: threshold,
          stock_id: stockModel.id,
        }
      );
      await tx.commit();
    } catch (error) {
      await tx.rollback();
    }
  }

  async getById(id: string): Promise<Stock> {
    const stockModel = await this._knex.raw(
      `SELECT 
      stocks.id AS id,
      JSON_ARRAYAGG(
      JSON_OBJECT(
        'quantity', stock_datas.quantity,
        'product_id', stock_datas.product_id,
        'threshold', stock_datas.threshold,
        'stock_id', stock_datas.stock_id
        )
      ) AS stock_datas,
      MAX(stocks.location_id) AS location_id,
      MAX(stocks.type) AS type,
      MAX(stocks.created_at) AS created_at,
      MAX(stocks.updated_at) AS updated_at
      FROM stocks
      LEFT JOIN stock_datas ON stocks.id = stock_datas.stock_id
      WHERE stocks.id = ?
      GROUP BY stocks.id`,
      [id]
    );

    const rawStock = stockModel[0][0];

    if (typeof rawStock.stock_datas === "string") {
      rawStock.stock_datas = JSON.parse(rawStock.stock_datas);
    }

    const stock = this._stockMapper.toDomain(rawStock);

    return stock;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(`DELETE FROM stocks WHERE id = :id`, {
      id: id,
    });
  }

  async getAllIds(): Promise<string[] | null> {
    const stockIdsColumn = await this._knex.raw<[{ id: string }[], any[]]>(`SELECT id FROM stocks`);

    const stockIds = stockIdsColumn[0].map((elm) => elm.id)

    return stockIds;
  }
}
