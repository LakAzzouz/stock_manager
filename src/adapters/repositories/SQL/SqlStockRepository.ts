import { Knex } from "knex";
import { StockRepository } from "../../../core/repositories/StockRepository";
import { Stock } from "../../../core/entities/Stock";
import { SqlStockMapper } from "../mappers/SqlStockMapper";
import { StockErrors } from "../../../core/errors/StockErrors";

export class SqlStockRepository implements StockRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _stockMapper: SqlStockMapper
  ) {}

  async save(stock: Stock): Promise<void> {
    const stockModel = this._stockMapper.fromDomain(stock);
    const tx = await this._knex.transaction();
    const stock_datas = stockModel.stock_datas;
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
      for (const stock_data of stock_datas) {
        await tx.raw(
          `INSERT INTO stock_datas (id, product_id, quantity, threshold, stock_id)
          VALUES (:id, :product_id, :quantity, :threshold, :stock_id)`,
          {
            id: stock_data.id,
            product_id: stock_data.product_id,
            quantity: stock_data.quantity,
            threshold: stock_data.threshold,
            stock_id: stockModel.id,
          }
        );
      }
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
              'id', sd.id,
              'quantity', sd.quantity,
              'product_id', sd.product_id,
              'threshold', sd.threshold,
              'stock_id', sd.stock_id
            )
      ) AS stock_datas,
      MAX(stocks.location_id) AS location_id,
      MAX(stocks.type) AS type,
      MAX(stocks.created_at) AS created_at,
      MAX(stocks.updated_at) AS updated_at
  FROM stock_datas AS sd
  LEFT JOIN stocks ON stocks.id = sd.stock_id
  WHERE stocks.id = :id
  GROUP BY stocks.id`,
      {
        id: id,
      }
    );

    const rawStock = stockModel[0][0];

    if (!rawStock) {
      throw new StockErrors.NotFound();
    }

    if (typeof rawStock.stock_datas === "string") {
      rawStock.stock_datas = JSON.parse(rawStock.stock_datas);
    }

    const stock = this._stockMapper.toDomain(rawStock);

    return stock;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(
      `DELETE FROM
      stocks WHERE id = :id`,
      {
        id: id,
      }
    );
  }

  async getAllIds(): Promise<string[] | null> {
    const stockIdsColumn = await this._knex.raw<[{ id: string }[], any[]]>(
      `SELECT id
      FROM stocks`
    );

    const stockIds = stockIdsColumn[0].map((elm) => elm.id);

    return stockIds;
  }
}
