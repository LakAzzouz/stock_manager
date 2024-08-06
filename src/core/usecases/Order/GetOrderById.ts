import { Order } from "../../entities/Order";
import { OrderErrors } from "../../errors/OrderErrors";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Usecases } from "../Usecase";

type GetOrderByIdInput = {
  id: string;
};

export class GetOrderById implements Usecases<GetOrderByIdInput, Promise<Order>> {
  constructor(private readonly _orderRepository: OrderRepository) {}

  async execute(input: GetOrderByIdInput): Promise<Order> {
    const { id } = input;

    const order = await this._orderRepository.getById(input.id);

    if (!order) {
      throw new OrderErrors.NotFound();
    }

    return order;
  }
}
