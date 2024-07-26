import { Order } from "../../entities/Order";
import { OrderErrors } from "../../errors/OrderErrors";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Usecases } from "../Usecase";

type ValidateOrderInput = {
  id: string;
};

export class ValidateOrder implements Usecases<ValidateOrderInput, Promise<Order>>{
  constructor(
    private readonly _orderRepository: OrderRepository,
  ) {}

  async execute(input: ValidateOrderInput): Promise<Order> {
    const order = await this._orderRepository.getById(input.id);

    if (!order) {
      throw new OrderErrors.NotFound();
    }

    order.validate();

    await this._orderRepository.update(order);

    return order;
  }
}
