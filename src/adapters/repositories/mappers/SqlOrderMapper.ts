import { Order } from "../../../core/entities/Order";
import { OrderModel } from "../models/OrderModel";
import { Mapper } from "./Mapper";

export class SqlOrderMapper implements Mapper<OrderModel, Order> {
  toDomain(raw: OrderModel): Order {
    const order = new Order({
      id: raw.id,
      productInfos: raw.product_infos.map((elm) => {
        return {
          productId: elm.product_id,
          quantity: elm.quantity,
        };
      }),
      locationId: raw.location_id,
      totalPrice: raw.total_price,
      orderDate: raw.order_date,
      status: raw.status,
      expectedArrivalDate: raw.expected_arrival_date,
      dateOfArrival: raw.date_of_arrival,
      updatedAt: raw.updated_at,
    });
    return order;
  }

  fromDomain(data: Order): OrderModel {
    const orderModel: OrderModel = {
      id: data.props.id,
      product_infos: data.props.productInfos.map((elm) => {
        return {
          product_id: elm.productId,
          quantity: elm.quantity,
        };
      }),
      location_id: data.props.locationId,
      total_price: data.props.totalPrice,
      order_date: data.props.orderDate,
      status: data.props.status,
      expected_arrival_date: data.props.expectedArrivalDate,
      date_of_arrival: data.props.dateOfArrival,
      updated_at: data.props.updatedAt,
    };
    return orderModel;
  }
}
