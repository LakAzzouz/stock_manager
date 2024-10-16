import { Knex } from "knex";
import { OrderRepository } from "../../../core/repositories/OrderRepository";
import { SqlOrderMapper } from "../mappers/SqlOrderMapper";
import { Order } from "../../../core/entities/Order";
import { OrderErrors } from "../../../core/errors/OrderErrors";

export class SqlOderRepository implements OrderRepository {
  constructor(
    private readonly _knex: Knex, // Permet de faire la passerelle entre node et mysql => Driver
    private readonly _orderMapper: SqlOrderMapper
  ) {}

  async save(order: Order): Promise<void> {
    const orderModel = this._orderMapper.fromDomain(order);
    const tx = await this._knex.transaction();
    try {
      await tx.raw(
        `INSERT INTO orders (id, total_price, location_id, order_date, status, expected_arrival_date, date_of_arrival, updated_at)
        VALUES (:id, :total_price, :location_id, :order_date, :status, :expected_arrival_date, :date_of_arrival, :updated_at)`,
        {
          id: orderModel.id,
          total_price: orderModel.total_price,
          location_id: orderModel.location_id,
          order_date: orderModel.order_date,
          status: orderModel.status,
          expected_arrival_date: orderModel.expected_arrival_date,
          date_of_arrival: orderModel.date_of_arrival ? orderModel.date_of_arrival : null,
          updated_at: orderModel.updated_at ? orderModel.updated_at : null,
        }
      );
      const productInfos = orderModel.product_infos.map((elm) => 
      `("${elm.product_id}", "${elm.quantity}", "${orderModel.id}")`).join(",");
      await tx.raw(
        `INSERT INTO product_infos (product_id, quantity, order_id)
        VALUES ${productInfos}`
      );
      await tx.commit();
    } catch (error) {
      await tx.rollback();
    }
  }

  async getById(id: string): Promise<Order> {
    const orderModel = await this._knex.raw(
      `SELECT
      orders.id AS id,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'quantity', product_infos.quantity,
          'product_id', product_infos.product_id
        )
      ) AS product_infos,
      MAX(orders.location_id) AS location_id,
      MAX(orders.total_price) AS total_price,
      MAX(orders.order_date) AS order_date,
      MAX(orders.status) AS status,
      MAX(orders.expected_arrival_date) AS expected_arrival_date,
      MAX(orders.date_of_arrival) AS date_of_arrival,
      MAX(orders.updated_at) AS updated_at
      FROM orders
      LEFT JOIN product_infos ON orders.id = product_infos.order_id
      WHERE orders.id = :id
      GROUP BY orders.id`,
      {
        id: id,
      }
    );

    const rawOrder = orderModel[0][0];

    if (!rawOrder) {
      throw new OrderErrors.NotFound();
    }

    if (typeof rawOrder.product_infos === "string") {
      rawOrder.product_infos = JSON.parse(rawOrder.product_infos);
    }

    const order = this._orderMapper.toDomain(rawOrder);

    return order;
  }

  async update(order: Order): Promise<Order> {
    const orderModel = this._orderMapper.fromDomain(order);
    await this._knex.raw(
      `UPDATE orders 
      SET date_of_arrival = :date_of_arrival,
      status = :status
      WHERE id = :id`,
      {
        date_of_arrival: orderModel.date_of_arrival,
        status: orderModel.status,
        id: orderModel.id,
      }
    );

    return order;
  }

  async delete(id: string): Promise<void> {
    await this._knex.raw(
      `DELETE FROM 
      orders WHERE id = :id`,
      {
        id: id,
      }
    );
  }
}
