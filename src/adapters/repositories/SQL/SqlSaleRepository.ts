import { Knex } from "knex";
import { SaleRepository } from "../../../core/repositories/SaleRepository";
import { SqlSaleMapper } from "../mappers/SqlSaleMapper";
import { Sale } from "../../../core/entities/Sale";
import { SaleErrors } from "../../../core/errors/SaleErrors";

export class SqlSaleRepository implements SaleRepository {
  constructor(
    private readonly _knex: Knex,
    private readonly _saleMapper: SqlSaleMapper
  ) {}

  async save(sale: Sale): Promise<void> {
    const saleModel = this._saleMapper.fromDomain(sale);
    const tx = await this._knex.transaction();
    const productId = saleModel.product_infos.map((elm) => elm.product_id)[0];
    const quantity = saleModel.product_infos.map((elm) => elm.quantity)[0];
    try {
      await tx.raw(
        `INSERT INTO sales (id, total_price, sale_date, updated_at)
        VALUES (:id, :total_price, :sale_date, :updated_at)`,
        {
          id: saleModel.id,
          total_price: saleModel.total_price,
          sale_date: saleModel.sale_date,
          updated_at: saleModel.updated_at ? saleModel.updated_at : null,
        }
      );
      await tx.raw(
        `INSERT INTO product_infos (product_id, quantity, sale_id)
        VALUES (:productId, :quantity, :saleId)`,
        {
          productId,
          quantity,
          saleId: saleModel.id,
        }
      );
      await tx.commit();
    } catch (error) {
      await tx.rollback();
    }
  }

  async getById(id: string): Promise<Sale> {
    const saleModel = await this._knex.raw(
      `SELECT
      sales.id AS id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'quantity', product_infos.quantity,
          'product_id', product_infos.product_id
        )
      ) AS product_infos,
      MAX(sales.total_price) AS total_price,
      MAX(sales.sale_date) AS sale_date,
      MAX(sales.updated_at) AS updated_at
      FROM sales
      LEFT JOIN product_infos ON sales.id = product_infos.sale_id
      WHERE sales.id = ?
      GROUP BY sales.id`,
      [id]
    );

    const rawSale = saleModel[0][0];

    if (!rawSale) {
      throw new SaleErrors.NotFound();
    }

    if (typeof rawSale.product_infos === "string") {
      rawSale.product_infos = JSON.parse(rawSale.product_infos);
    }

    const sale = this._saleMapper.toDomain(rawSale);

    return sale;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(`DELETE FROM sales WHERE id = :id`, {
      id: id,
    });
  }
}
