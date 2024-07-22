import { Order } from "../../entities/Order";
import { OrderErrors } from "../../errors/OrderErrors";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Usecases } from "../Usecase";

type UpdateOrderInput = {
  id: string;
  dateOfArrival: Date;
};

export class UpdateOrder implements Usecases<UpdateOrderInput, Promise<Order>> {
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute(input: UpdateOrderInput): Promise<Order> {
    const { id, dateOfArrival } = input;

    const order = await this._orderRepository.getById(id);

    if (!order) {
      throw new OrderErrors.NotFound();
    }

    const orderUpdated = order.update(dateOfArrival);

    return orderUpdated;
  }
}
