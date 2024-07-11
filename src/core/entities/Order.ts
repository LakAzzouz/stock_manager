import { v4 } from "uuid";
import { DateOfArrival } from "../valuesObject.ts/DateOfArrival";
import { ProductInfo } from "../types/ProductInfo";
import { OrderStatus } from "../types/OrderStatus";

export type OrderProperties = {
  id: string;
  productInfos: ProductInfo[];
  totalPrice: number;
  locationId: string;
  orderDate: Date;
  status: OrderStatus;
  expectedArrivalDate: Date;
  dateOfArrival?: Date;
  updatedAt?: Date;
};

export class Order {
  props: OrderProperties;

  constructor(orderProperties: OrderProperties) {
    this.props = orderProperties;
  }

  static create(props: {locationId: string, productInfos: ProductInfo[]; totalPrice: number;}): Order {
    const week = 1;
    const order = new Order({
      id: v4(),
      totalPrice: props.totalPrice,
      productInfos: props.productInfos,
      locationId: props.locationId,
      status: OrderStatus.IN_PROGRESS,
      orderDate: new Date(),
      expectedArrivalDate: Order.dateAddWeeks(week, new Date()),
    });
    return order;
  }

  update(newDateOfArrival: Date): Order {
    this.props.totalPrice = DateOfArrival.dateLimit(newDateOfArrival, this.props.orderDate, this.props.totalPrice);
    this.props.dateOfArrival = newDateOfArrival;
    return this;
  }

  static dateAddWeeks(a: number, b: Date) {
    var d = new Date(b || new Date());
    d.setDate(d.getDate() + a * 7);
    return d;
  }

  validate() {
    this.props.dateOfArrival = new Date();
    this.props.status = OrderStatus.VALIDATED;
  }
}
