import { v4 } from "uuid";
import { DateOfArrival } from "../valuesObject.ts/DateOfArrival";

export type OrderProperties = {
  id: string;
  productIds: string[];
  totalPrice: number;
  orderDate: Date;
  dateOfArrival: Date;
  updatedAt?: Date;
};

export class Order {
  props: OrderProperties;

  constructor(orderProperties: OrderProperties) {
    this.props = orderProperties;
  }

  static create(props: { productIds: string[]; totalPrice: number }): Order {
    const order = new Order({
      id: v4(),
      productIds: props.productIds,
      totalPrice: props.totalPrice,
      orderDate: new Date(),
      dateOfArrival: new Date(),
      updatedAt: new Date(),
    });
    return order;
  }

  update(newDateOfArrival: Date): Order {
    this.props.totalPrice = DateOfArrival.dateLimit(newDateOfArrival, this.props.orderDate, this.props.totalPrice)
    return this;
  }
}
