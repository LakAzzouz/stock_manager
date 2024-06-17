import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories.ts/OrderRepository";
import { PriceOrder } from "../../valuesObject.ts/TotalPrice";
import { Usecases } from "../Usecase";

type CreateOrderInput = {
  productIds: string[];
  totalPrice: number;
};

export class CreateOrder implements Usecases<CreateOrderInput, Promise<Order>> {
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute(input: CreateOrderInput): Promise<Order> {
    const totalPrice = PriceOrder.totalPrice(input.totalPrice);

    const order = Order.create({
      productIds: input.productIds,
      totalPrice: totalPrice,
    });

    this._orderRepository.save(order);

    return order;
  }
}
