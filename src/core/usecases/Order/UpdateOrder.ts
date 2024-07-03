import { Order } from "../../entities/Order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Usecases } from "../Usecase";

type UpdateOrderInput = {
  id: string;
  dateOfArrival: Date;
};

export class UpdateOrder implements Usecases<UpdateOrderInput, Promise<Order>> {
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute(input: UpdateOrderInput): Promise<Order> {
    const order = await this._orderRepository.getById(input.id);

    const orderUpdated = order.update(input.dateOfArrival);

    return orderUpdated
  }
}
